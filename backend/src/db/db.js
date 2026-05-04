import mongoose  from "mongoose";

export const connectDB=()=>{
    const url=process.env.URL_DATABESE
    console.log(process.env.URL_DATABESE)
    mongoose.connect(url)
    .then(()=>{
        console.log("mongoose connect...")
    })
    .catch((e)=>{
        console.log("mongoose connect  error ",e)
    })
}