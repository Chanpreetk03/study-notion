//require
const mongoose = require('mongoose')

//Section schema
const SectionSchema = new mongoose.Schema({
	sectionName:{
        type:String,
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection"
        }
    ],
    
})

module.exports = mongoose.model('Section', SectionSchema)
