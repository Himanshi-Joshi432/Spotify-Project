const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
        enum:["user","artist"]
    }
})
 const UserModel = mongoose.model("users",userSchema)
   
 module.exports=UserModel