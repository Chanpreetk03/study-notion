//require
const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User')
const { uploadImageToCloudinary } = require('../utils/imageUploader')

//creteCourse handler
exports.createCourse = async (req, res) => {
	try {
		//fetch data
		const { courseName, 
			courseDescription, 
			whatYouWillLearn, 
			price, 
			category,
			status,
			instructions } = req.body

		//get thumbnail
		const thumbnail = req.files.thumbnailImage

		//validation
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!category ||
			!thumbnail
		) {
			return res.status(400).json({
				success: false,
				message: 'All the fields are required',
			})
		}

		//check for instructor
		const userId = req.user.id
		const instructorDetails = await User.findById(userId)
		console.log('Instructor Details', instructorDetails)

		if (!instructorDetails) {
			return res.status(500).json({
				success: false,
				message: 'Instructor details not found',
			})
		}

		//check given tags - validation
		const categoryDetails = await Category.findById(category)
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: 'Category details not found',
			})
		}

		//Upload images to cloudinary
		const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

		//create an entry for new cours
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag:tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status:status,
			instructions:instructions
		})

		//add the course in user schema
		await User.findByIdAndUpdate(
			{ _id: tagDetails._id },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		)

		//update category schema
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);

		//return response
		return res.status(200).json({
			success: true,
			message: 'course create successfully',
			data: newCourse,
		})
	} catch (error) {
		console.log(error)
		return res.status(400).json({
			success: false,
			message: 'Course could not be made',
		})
	}
}

//get all courses handler
exports.getAllCourse = async (req, res) => {
	try {
		//fetch data
		const allCourses = await Course.find(
			{},
			{ courseName: true },
			{ price: true },
			{ thumbnail: true },
			{ instructor: true },
			{ ratingAndReviews: true },
			{ studentsEnrolled: true }
		)
			.populate('instructor')
			.exec()

		//return data
		return res.status(200).json({
			success: true,
			data: allCourses,
			message: 'All courses fetched successfully',
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: 'could not show courses',
		})
	}
}

//get complete course all the details
exports.getCourseDetails = async (req, res) => {
	try {
		//fetch course id
		const { courseId } = req.body

		//populate querires for(section subsection intructor)
		const courseDetails = await Course.find({ _id: courseId })
			.populate({
				path: 'instructor',
				populate: {
					path: 'additionalDetails',
				},
			})
			.populate('category')
			.populate('ratingAndReviews')
			.populate({
				path: 'courseContent',
				populate: {
					path: 'subSection',
				},
			})
			.exec()

		//validation
		if (!courseDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find course with id :${courseId}`,
			})
		}
		//return response
		return res.status(200).json({
			success: true,
			message: 'Course fetched Successfully',
			data: courseDetails,
		})
        
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: 'could not show course data',
		})
	}
}
