const mongoose = require("mongoose");
const app = require("./app");
require('dotenv').config();
const port = process.env.PORT || 5000;


//Database Connection
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log('DB connected')
});


//Database running port
app.listen(port, ()=>{
    console.log("Port is running")
});