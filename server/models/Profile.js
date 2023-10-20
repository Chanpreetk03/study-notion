//require
const mongoose=require("mongoose");

//Profile schema
const ProfileSchema=new mongoose.Schema({
    gender:{
        type:String,
    },
    dateOfBirth:{
        type:String
    },
    about:{
        type:String,
    },
    contactNumber:{
        type:Number,
    },
    additionalDetails: {
		type: String,
	},
});

module.exports=mongoose.model("Profile" , ProfileSchema);
