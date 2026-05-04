import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String
    
    },
    DOB:{
        type:String
    
    },
    gender:{
        type:String
    
    },
    email:{
        type:String,
        required:true,
        unique:true
    
    },
    password:{
        type:String,
        required:true
    
    },
}, { timestamps: true }) 

export const User=mongoose.model("User",userSchema)