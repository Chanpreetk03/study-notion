//require
const mongoose=require("mongoose");
require("dotenv").config();

//connect function
exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("Database connection successful");
    })
    .catch((error)=>{
        console.error(error);
        console.log("Database connection failed");
        process.exit(1);
    })
}
