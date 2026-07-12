const express = require("express");
const connectDB = require("./config/database");
const app = express();
exports.app = app;
const cookie = require("cookie-parser");
app.use(express.json());
app.use(cookie());

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const connectionRouter = require("./routers/connection");


//So by using the use what it will do it will go one by one in the each routes and will compare it with the request you have send like profile and anything else , first it will go to authRouter in auth router it will check if profile exists or not then it will go to profileRouter and will return the output as it encounter.
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",connectionRouter);



// app.get("/user", async(req,res)=>{

//     const userEmail = req.body.emailId;


//     try{
//         const users = await User.find({emailId : userEmail});
        
//         if(!users){
//             res.status(401).send("users not found");
//         }
//         else{
//             res.send(users);
//         }

//     }catch(err){
//         res.status(401).send("Something is wrong" + err.message);
//     }
// });

// app.delete("/deleteUser",async(req,res)=>{
//     const userId = req.body.userId;
    
//     try{
//         const deleteUser = await User.findByIdAndDelete(userId);
//         res.send("deleted user succesfully");
//     }catch(err){
//         res.status(403).send("Something went wrong" + err.message);
//     }
// });

// app.patch("/update/:userId",async(req,res)=>{
//     const userId = req.params?.userId;
//     const data = req.body;


//     try{
//         const ApprovedChanges = [
//         "userId", "firstName", "lastName", "age", "gender", "password"
//         ];

//         const changes = Object.keys(data).every((k)=> ApprovedChanges.includes(k) );
//         if(!changes){
//         throw new Error(" Data can't be modified ");
//         }
//         const update = await User.findByIdAndUpdate({_id : userId},data , {
//             runValidators : true,
//         });
//         res.send("update succesfully");
//         }catch(err){
//             res.status(404).send("Something went wrong " + err.message);
//         }
// });

connectDB().then(()=>{
    console.log("DataBase is Connected .");
    app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...");
}) 
}).catch((err)=>{
    console.log("Database is not connected .");
});

 