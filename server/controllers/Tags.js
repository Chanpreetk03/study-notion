//require
const Tags = require('../models/Tags')

//create tag handler
exports.createTag = async (req, res) => {
	try {
		//fetch data
		const { name, description } = req.body

		//validation
		if (!name || !description) {
			return res.status(400).json({
				success: false,
				message: 'All fields are required',
			})
		}

		//create entry in db
		const tagDetails = await Tag.create({
			name: name,
			description: description,
		})
		console.log(tagDetails)

		//return response
		return res.status(200).json({
			success: true,
			message: 'Tag created successfully',
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

//get all tags handler function
exports.showAllTags = async (req, res) => {
	try {
		//fetch data
		const allTags = await Tag.find({}, { name: true, description: true })

		//return data
		res.status(200).json({
			success: true,
			message: 'all tags return successfully',
			allTags,
		})
        
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
