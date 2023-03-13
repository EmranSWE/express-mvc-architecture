const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/laptop.routes");

//Middleware
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Server is running")
});

app.use("/api/v1/laptop",router);
module.exports = app;