//require
const mongoose = require('mongoose')

//Course Progress schema
const CourseProgressSchema = new mongoose.Schema({
	courseID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
	},
	completedVideos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'SubSection',
		},
	],
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
})

module.exports = mongoose.model('CourseProgress', CourseProgressSchema)
