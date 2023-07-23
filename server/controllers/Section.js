//require
const Section = require('../models/Section')
const Course = require('../models/Course')

//create section handler
exports.createSection = async (req, res) => {
	try {
		//fetch data
		const { sectionName, courseId } = req.body

		//data validation
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: 'All properties are required',
			})
		}

		//create section
		const newSection = await Section.create({ sectionName })

		//update course with section ObjectId
		const updatedCourseDetails = await Course.findOneAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
        // use populate to update section and subsection to course details
		//return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        })

	} catch (error) {
        console.log(error);
        return res.status(200).json({
            success:false,
            message:"section not created successfully",
            error:error.message
        })
    }
}

//update section handler
exports.updateSection = async (req,res) => {
    try {
        //fetch data
        const{sectionName,sectionId}=req.body;

        //validation
        if (!sectionName || !sectionId) {
			return res.status(400).json({
				success: false,
				message: 'All properties are required',
			})
		}

        //update data
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        
        //return response
        return res.status(200).json({
            success:true,
            message:"Section updated successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success:false,
            message:"section not updated successfully",
            error:error.message
        })
    }
}