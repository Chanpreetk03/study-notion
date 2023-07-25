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
        trim:true,
    },
    contactNumber:{
        type:Number,
        trim:true,
    }
});

module.exports=mongoose.model("Profile" , ProfileSchema);