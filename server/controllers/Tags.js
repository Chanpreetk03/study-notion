//require
const Category = require('../models/Category')

//create category handler
exports.createCategory = async (req, res) => {
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
		const CategoryDetails = await Category.create({
			name: name,
			description: description,
		})
		console.log(CategoryDetails)

		//return response
		return res.status(200).json({
			success: true,
			message: 'Category created successfully',
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

//get all categories handler function
exports.showAllCategories = async (req, res) => {
	try {
		//fetch data
		const allCategories = await Category.find({}, { name: true, description: true })

		//return data
		res.status(200).json({
			success: true,
			message: 'all tags return successfully',
			allCategories,
		})
        
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
