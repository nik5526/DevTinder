const express = require("express");

const app = express();

app.use("/admin",(req,res,next)=>{
    const tokens = "xyz";
    const Authentication = tokens === "xyz";
    if(!Authentication){
        res.status(401).send("Unautherized request");
    }
    else{
        next();
    }
});

app.get("/admin/MainData",(req,res)=>{
    res.send("data is sent");
});

app.get("/admin/deleteData",(req,res)=>{
    res.send("Data is deleted");
});



app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...");
})