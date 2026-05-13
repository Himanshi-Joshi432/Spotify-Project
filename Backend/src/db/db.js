const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


async function ConnectDB(){
    try {
        await mongoose.connect("mongodb+srv://yt:O6q27VUTrrPZ4eUj@yt-complete-backend.nklvksj.mongodb.net/spotify")
        console.log("connected to database")
    } catch (error) {
        console.log("error connecting to database",error)
    }   
}


module.exports=ConnectDB