const mongoose = require('mongoose')

const MusicSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    audioUrl:{
        type:String,
        required:true
    }
})

const MusicModel = mongoose.model('musics',MusicSchema)

module.exports = MusicModel
