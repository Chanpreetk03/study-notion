//require
const mongoose = require('mongoose')

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
        expires:5*60,
    }
})

//function to send otp mails
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse=await mailSender(email , "verification mail from study Notion" , otp);
        console.log("mail sent successfully" , mailResponse)
    } catch (error) {
        console.error("Error occured while sending mail:",error);
        throw error;
    }
}

OTPSchema.pre("save" , async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model('OTP', OTPSchema)
