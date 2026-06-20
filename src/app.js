const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const ValidateSignup = require("./utils/ValidateSignup");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth");
app.use(express.json());
app.use(cookie());

app.post("/signup",async (req,res)=>{

    try{
        //validate the user 
        ValidateSignup(req);

        //encrypt the password
        const {firstName , lastName , emailId , password} = req.body;

        const passwordHash = await bcrypt.hash(password ,10);

        //creating the new instance of the user .
        const user = new User({firstName , lastName , emailId , password : passwordHash});

        await user.save();
        res.send("Data Added Successfully");
    }catch(err){
        res.status(400).send("Error saving the user : " + err.message);
    }
});

app.post("/login",async (req,res)=>{
    try{
        const {emailId , password} = req.body;

        const user = await User.findOne({emailId : emailId});


        if(!user){
            throw new Error(" Either email or password is not valid ");
        }

        //verify the password 
        const isVerifidPassword = await bcrypt.compare(password , user.password);

        if(isVerifidPassword){

            //create JWT token

            const token = await jwt.sign({_id : user._id},"nik@54321",{expiryIn : '1d'});
            // first one will be what you have to hide and second one will be the password you set that only you know.
            console.log(token);
            //wrap jwt in cookies
            res.cookie("token",token , 
                {expires : new Date(Date.now() + 8 * 3600000)});//it will expires in 8 hrs.
            res.send("Login successful");
        }
        else{
            throw new Error(" Either email or password is not valid ");
        }

    }catch(err){
        res.status(450).send("Error : " + err.message);
    }

});

app.get("/profile", userAuth , async (req,res)=>{
    try{
        
        const user = req.user;
        
        res.send(user);

    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

app.post("/sendConnectionRequest", userAuth , (req,res)=>{

    const user = req.user;
    const {firstName} = user;
    res.send("Connection request send by " + firstName);
})

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

 