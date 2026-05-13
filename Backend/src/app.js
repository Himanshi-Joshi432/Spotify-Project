const express = require('express');
const cors = require('cors');
const authroutes = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const musicroutes = require('./routes/music.route')


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use('/api/auth', authroutes);
app.use('/api/music', musicroutes)

module.exports = app;