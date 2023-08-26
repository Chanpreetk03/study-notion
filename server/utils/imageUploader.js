//require
const cloudinary=require("cloudinary").v2;

//image uploader
exports.uploadImageToCloudinary=async (file,folder,height,quality)=>{
    const options={folder};
    //check height
    if(height){
        options.height=height;
    }
    //check quality
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    console.log("OPTIONS:" , options);
    return await cloudinary.uploader(file.tempFilePath , options);
}