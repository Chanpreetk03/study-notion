//require
const mongoose = require('mongoose')

//Tag schema
const TagSchema = new mongoose.Schema({
	name:{
        required:true,
        type:String
    },
    description:{
        type:String,
        trim:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }
})

module.exports = mongoose.model('Tags', TagSchema)
