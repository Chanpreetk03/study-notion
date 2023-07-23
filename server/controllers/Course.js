//require
const Course=require("../models/Course");
const Tag=require("../models/Tags");
const User=require("../models/User");
const {uploadImageToCloudinary}=require("../utils/imageUploader");

//creteCourse handler
exports.createCourse = async(req,res)=>{
    try {
        //fetch data
        const {courseName , courseDescription , whatYouWillLearn , price ,tag}=req.body;

        //get thumbnail
        const thumbnail=req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All the fields are required"
            })
        }

        //check for instructor
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);
        console.log("Instructor Details" , instructorDetails);

        if(!instructorDetails){
            return res.status(500).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        //check given tags - validation
        const tagDetails=await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"Tag details not found"
            })
        }

        //Upload images to cloudinary
        const thumbnailImage= await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create an entry for new cours
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        //add the course in user schema
        await User.findByIdAndUpdate(
            {_id:tagDetails._id},
            {
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true}
        )
        
        //update tag schema
        //

        //return response
        return res.status(200).json({
            success:true,
            message:"course create successfully",
            data:newCourse,
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Course could not be made"
        })
    }
}

//get all courses handler
exports.showAllCourse = async (req,res)=>{
    try {
        //fetch data
        const allCourses=await Course.find({} , {courseName:true},{price:true},{thumbnail:true},{instructor:true},{ratingAndReviews:true},{studentsEnrolled:true}).populate("instructor").exec();

        //return data
        return res.status(200).json({
            success:true,
            data:allCourses,
            message:"All courses fetched successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"could not show courses",
        })
    }
}