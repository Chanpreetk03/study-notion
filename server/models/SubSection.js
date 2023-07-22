//require
const mongoose = require('mongoose')

//sub section schema
const SubSectionSchema = new mongoose.Schema({
	title:{
        type:String,
    },
    timeDuration:{
        type:String
    },
    description:{
        type:String
    },
    videoUrl:{
        type:String
    },
});

module.exports = mongoose.model('SubSection', SubSectionSchema)
