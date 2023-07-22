//require
const nodemailer=require("nodemailer");

const mailSender=async (email,title,body)=>{
    try {
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:Process.env.MAIL_PASS,
            }
        })
        let info=await transporter.sendMail({
            from:"Study Notion",
            to:`${email}`,
            subject:`${title}`,
            body:`${body}`,
        })
        console.log(info);
        return info;
    } 
    catch (error) {
        console.error(error.message);

    }
}

module.exports=mailSender;