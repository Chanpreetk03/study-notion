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

//get all ratings
