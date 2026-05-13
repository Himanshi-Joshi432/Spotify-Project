const app = require('./src/app');
const ConnectDB = require('./src/db/db');
require('dotenv').config();

ConnectDB();

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})