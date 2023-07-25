//require
const mongoose = require('mongoose')

//Ratings and review schema
const ratingAndReviewsSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	review: {
		type: String,
		required: true,
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
		required: true,
		index: true,
	},
})

module.exports = mongoose.model('RatingAndReview', ratingAndReviewsSchema)
