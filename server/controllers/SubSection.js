//require
const SubSection = require('../models/SubSection')
const Section = require('../models/SubSection')
require('dotenv').config()
const { uploadImageToCloudinary } = require('../utils/imageUploader')
//create subsection
exports.createSubSection = async (req, res) => {
	try {
		//fetch data
		const { sectionId, title, timeDuration, description } = req.body

		//extract vid file
		const video = req.files.videoFile

		//validate
		if (!sectionId || !title || !timeDuration || !description || !video) {
			return res.status(400).json({
				success: false,
				message: 'All the fields are required',
			})
		}

		//upload vid to cloudinary and fet secure url
		const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

		//create sub section
		const SubSectionDetails = await SubSection.create({
			title: title,
			timeDuration: timeDuration,
			description: description,
			videoUrl: uploadDetails.secure_url,
		})

		//update section with this sub section
		const updatedSection = await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{
				$push: {
					SubSection: SubSection._id,
				},
			},
			{ new: true }
		)
		//log updated section here after adding populate query
		//return
		return res.status(200).json({
			success: true,
			message: 'Sub section created',
			updatedSection,
		})
	} catch (error) {
		console.log(error)
		return res.status(200).json({
			success: false,
			message: 'sub-section not created successfully',
			error: error.message,
		})
	}
}

//update subsection handler
exports.updateSubSection = async (req, res) => {
	try {
		const { sectionId, title, description } = req.body
		const subSection = await SubSection.findById(sectionId)

		if (!subSection) {
			return res.status(404).json({
				success: false,
				message: 'SubSection not found',
			})
		}

		if (title !== undefined) {
			subSection.title = title
		}

		if (description !== undefined) {
			subSection.description = description
		}
		if (req.files && req.files.video !== undefined) {
			const video = req.files.video
			const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)
			subSection.videoUrl = uploadDetails.secure_url
			subSection.timeDuration = `${uploadDetails.duration}`
		}

		await subSection.save()

		return res.json({
			success: true,
			message: 'Section updated successfully',
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			success: false,
			message: 'An error occurred while updating the section',
		})
	}
}

//delete subsection handler
exports.deleteSubSection = async (req, res) => {
	try {
		const { subSectionId, sectionId } = req.body
		await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{
				$pull: {
					subSection: subSectionId,
				},
			}
		)
		const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

		if (!subSection) {
			return res.status(404).json({ success: false, message: 'SubSection not found' })
		}

		return res.json({
			success: true,
			message: 'SubSection deleted successfully',
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			success: false,
			message: 'An error occurred while deleting the SubSection',
		})
	}
}
