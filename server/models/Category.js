//require
const mongoose = require('mongoose')

//Category schema
const CategorySchema = new mongoose.Schema({
	name: {
		required: true,
		type: String,
	},
	description: {
		type: String,
		trim: true,
	},
	course: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Course',
		},
	],
})

module.exports = mongoose.model('Category', CategorySchema)
