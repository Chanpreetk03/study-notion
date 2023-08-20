//require
const RatingAndReviews = require('../models/RatingAndReview')
const Course = require('../models/Course')

//create Rating
exports.createRating = async (req, res) => {
	try {
		//get user id
		const userId = req.user.id

		//fetch data
		const { rating, review, courseId } = req.body

		//check if user is enrolled
		const courseDetails = await Course.findOne({
			_id: courseId,
			studentsEnrolled: { $elemMatch: { $eq: userId } },
		})
		if (!courseDetails) {
			return res.status(404).json({
				success: false,
				message: 'Student is not enrolled in course',
			})
		}

		//check if already reviewed the course or not
		const alreadyReviewed = await RatingAndReviews.findOne({
			user: userId,
			course: courseId,
		})
		if (alreadyReviewed) {
			return res.status(403).json({
				success: false,
				message: 'Course has already reviewed by this user',
			})
		}

		//create rating and review
		const ratingReview = RatingAndReviews.create({
			rating,
			review,
			course: courseId,
			user: userId,
		})

		//attach to course
		await Course.findByIdAndUpdate(
			{ _id: courseId },
			{
				$push: {
					ratingAndReviews: ratingReview._id,
				},
			},
			{ new: true }
		)

		//return response
		return res.status(200).json({
			success: true,
			message: 'rating and review made successfully',
			ratingReview,
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: 'Rating and review could not be made',
		})
	}
}

//get avg rating
exports.getAverageRating = async (req, res) => {
	try {
		//fetch data
		const courseId = req.body.courseId

		//calculate avg rating
		const result = await RatingAndReviews.aggregate([
			{
				$match: {
					course: new mongoose.Types.ObjectId(courseId),
				},
			},
			{
				$group: {
					_id: null,
					averageRating: { $avg: '$rating' },
				},
			},
		])
		//return rating
		if (result.length > 0) {
			return res.status(200).json({
				success: true,
				message: 'Average rating found',
				averageRating: result[0].averageRating,
			})
		}

		//if no ratings and reviews
		return res.status(200).json({
			success: true,
			message: 'No ratings given',
			averageRating: 0,
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

//get all ratings
exports.getAllRating = async (req, res) => {
	try {
		//fetch data
		const allReviews = await RatingAndReview.find({})
			.sort({ rating: 'desc' })
			.populate({
				path: 'user',
				select: 'firstName lastName email image',
			})
			.populate({
				path: 'course',
				select: 'courseName',
			})
			.exec()

		//return response
		return res.status(200).json({
			success: true,
			message: 'All reviews fetched',
			data: allReviews,
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
