const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");

//auth
exports.auth=async(req,res,next)=>{
    try {
        //extract token
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        //if token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        };

        //verify the token
        try {
            const decode=await jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        } catch (error) {
            //verification issue
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}

//isStudent
exports.isStudent=async (req,res,next)=>{
    try {
        const userDetails = await User.findOne({ email: req.user.email });
        if(userDetails !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for student only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role can not be verified. Please try again"
        })
    }
}

//isInstructor
exports.isInstructor=async (req,res,next)=>{
    try {
        const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

        if(userDetails !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for instructor only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role can not be verified. Please try again"
        })
    }
}

//isAdmin
exports.isAdmin=async (req,res,next)=>{
    try {
        const userDetails=await User.findOne({email:req.user.email})
        if(userDetails.accountTyp !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for admin only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role can not be verified. Please try again"
        })
    }
}

