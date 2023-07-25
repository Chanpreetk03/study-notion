//require
const mongoose = require('mongoose')

//course schema
const CourseSchema = new mongoose.Schema({
	courseName: {
		type: String,
		trim: true,
		required: true,
	},
	courseDescription: {
		type: String,
		trim: true,
	},
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	whatYouWillLearn: {
		type: String,
		trim: true,
	},
	CourseContent: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Section',
		},
	],
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'RatingAndReview',
		},
	],
	price: {
		type: Number,
		required: true,
	},
	thumbnail: {
		type: String,
	},
	category: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
	],
	tag: {
		type: [String],
		required: true,
	},
	studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	],
	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ['Draft', 'Published'],
	},
})

module.exports = mongoose.model('Course', CourseSchema)
