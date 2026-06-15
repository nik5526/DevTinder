const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
//it is the middleware so that the server can 
app.use(express.json());

app.post("/signup",async (req,res)=>{
    //creating the new instance of the user .
    const user = new User(req.body);

    try{
        await user.save();
        res.send("Data Added Successfully");
    }catch(err){
        res.status(400).send("Error saving the user " + err.message);
    }
});

app.get("/user", async(req,res)=>{

    const userEmail = req.body.emailId;


    try{
        const users = await User.find({emailId : userEmail});
        
        if(users.length === 0){
            res.status(401).send("users not found");
        }
        else{
            res.send(users);
        }

    }catch(err){
        res.status(401).send("Something is wrong" + err.message);
    }
});

app.delete("/deleteUser",async(req,res)=>{
    const userId = req.body.userId;
    
    try{
        const deleteUser = await User.findByIdAndDelete(userId);
        res.send("deleted user succesfully");
    }catch(err){
        res.status(403).send("Something went wrong" + err.message);
    }
});

app.patch("/update",async(req,res)=>{
    const userId = req.body.userId;
    const data = req.body;

    try{
        const update = await User.findByIdAndUpdate({_id : userId},data , {
            runValidators : true,
        });
        res.send("update succesfully");
    }catch(err){
        res.status(404).send("Something went wrong " + err.message);
    }
});

connectDB().then(()=>{
    console.log("DataBase is Connected .");
    app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...");
}) 
}).catch((err)=>{
    console.log("Database is not connected .");
});

