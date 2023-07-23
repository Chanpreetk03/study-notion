//require
const cloudinary=require("cloudinary").v2;

//image uploader
exports.uploadImageToCloudinary=async (file,folder,height,quality)=>{
    const options={folder};
    //check height
    if(height){
        option.height=height;
    }
    //check quality
    if(quality){
        option.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader(file,tempFilePath , options);
}