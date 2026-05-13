const express = require('express');
const uploadImage = require('../services/storage.service');
const jwt = require('jsonwebtoken');
const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');


async function uploadMusic(req, res) {
   const {title} = req.body;
    const file = req.file;
    if (!file) {
    return res.status(400).json({ message: 'File is required' });
}
    const result = await uploadImage(file.buffer);
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const music = await musicModel.create({
        title,
        audioUrl: result.url,
        artist: decoded.id
    });
    res.status(201).json({
         message: 'Music uploaded successfully',
          music:{
            id: music._id,
            title: music.title,
            url: music.url,
            artist: music.artist
          } });
}

async function createAlbum(req, res) {
         const { title,music } = req.body;
    const album = await albumModel.create({
        title,
        artist: decoded.id,
        musics: music
    });
    res.status(201).json({ message: 'Album created successfully', album });
}

async function getAllMusic(req, res) {
    const music = await musicModel.find().populate('artist');
    res.status(200).json({
        message: 'Music fetched successfully',
        music });
}

module.exports = {
    uploadMusic,
    createAlbum,
    getAllMusic
}