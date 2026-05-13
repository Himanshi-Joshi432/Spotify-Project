const express = require('express')
const router = express.Router()
const MusicController = require('../controller/music.controller')
const multer = require('multer');
const authMiddleware = require('../middleware/auth.middleware')

const upload = multer({storage: multer.memoryStorage()});




router.post('/upload',authMiddleware.authArtist,upload.single('music'),MusicController.uploadMusic)
router.post('/album',authMiddleware.authArtist,MusicController.createAlbum)
router.get('/all',MusicController.getAllMusic)

module.exports = router