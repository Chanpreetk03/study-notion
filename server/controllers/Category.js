//require
const Category = require('../models/Category')

//create category handler
exports.createCategory = async (req, res) => {
	try {
		//fetch data
		const { name, description } = req.body

		//validation
		if (!name) {
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
		const allCategories = await Category.find()

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

//categoryPageDetails
exports.getCategoryPageDetails = async (req, res) => {
	try {
		//fetch category id
		const { categoryId } = req.body

		//get courses for specified categoryid
		const selectedCategory = await Category.findById(categoryId)
			.populate({
				path: 'courses',
				match: { status: 'Published' },
				populate: 'ratingAndReviews',
			})
			.exec()

		console.log('selected category:', selectedCategory)

		//validation
		if (!selectedCategory) {
			return res.status(404).json({
				success: false,
				message: 'data not found',
			})
		}

		// Handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log('No courses found for the selected category.')
			return res.status(404).json({
				success: false,
				message: 'No courses found for the selected category.',
			})
		}

		//get courses for different categories
		const differentCategories = await Category.find({
			_id: { $ne: categoryId },
		})
			.populate('courses')
			.exec()

		//get top selling courses
		const allCategories = await Category.find()
			.populate({
				path: 'courses',
				match: { status: 'Published' },
			})
			.exec()
		const allCourses = allCategories.flatMap((category) => category.courses)
		const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10)
		//return response
		return res.status(200).json({
			success: true,
			data: {
				selectedCategory,
				differentCategories,
				mostSellingCourses,
			},
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
