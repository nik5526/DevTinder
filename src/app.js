const express = require("express");
const connectDB = require("./config/database");
const app = express();

app.get("/getuserData",(req,res)=>{
    throw new Error("nkjendiewk");
    res.send("User Data sent");
});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something Gone wrong");
    }
});


connectDB().then(()=>{
    console.log("DataBase is Connected .");
    app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...");
}) 
}).catch((err)=>{
    console.log("Database id not connected .");
});