//require
const nodemailer=require("nodemailer");

const mailSender=async (email,title,body)=>{
    try {
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
            secure:false,
        })
        let info=await transporter.sendMail({
            from:`Study Notion | <${process.env.MAIL_USER}>`,
            to:`${email}`,
            subject:`${title}`,
            body:`${body}`,
        })
        console.log(info);
        return info;
    } 
    catch (error) {
        console.error(error.message);
        return error.message
    }
}

module.exports=mailSender;