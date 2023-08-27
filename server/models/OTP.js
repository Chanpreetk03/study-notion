//require
const mongoose = require('mongoose')
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

//otp schema
const OTPSchema = new mongoose.Schema({
	email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60*60*24,
    }
})

//function to send otp mails
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse=await mailSender(email , "verification mail from study Notion" , emailTemplate(otp));
        console.log("mail sent successfully" , mailResponse.response)
    } catch (error) {
        console.error("Error occurred while sending mail:",error);
        throw error;
    }
}

OTPSchema.pre("save" , async function(next){
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp);
    }
    next();
})

module.exports = mongoose.model('OTP', OTPSchema)
