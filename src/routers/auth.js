const express = require("express");
const { app } = require("../app");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("../middlewares/auth");
const {ValidateSignup} = require("../utils/ValidateSignup");

const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{

    try{
        //validate the user 
        ValidateSignup(req);

        //encrypt the password
        const {firstName , lastName , emailId , password , age , gender , about} = req.body;

        const passwordHash = await bcrypt.hash(password ,10);

        //creating the new instance of the user .
        const user = new User({firstName , lastName , emailId , password : passwordHash , age , gender , about});

        await user.save();
        res.send("Data Added Successfully");
    }catch(err){
        res.status(400).send("Error saving the user : " + err.message);
    }
});

authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId , password} = req.body;

        const user = await User.findOne({emailId : emailId});


        if(!user){
            throw new Error(" Either email or password is not valid ");
        }

        //verify the password 
        const isVerifidPassword = await user.isVerified(password);

        if(isVerifidPassword){

            //create JWT token

            const token = await user.getJWT();
            // first one will be what you have to hide and second one will be the password you set that only you know.
            //wrap jwt in cookies
            res.cookie("token",token , 
                {expires : new Date(Date.now() + 8 * 3600000)});//it will expires in 8 hrs.
            res.send(user);
        }
        else{
            throw new Error(" Either email or password is not valid ");
        }

    }catch(err){
        res.status(450).send("Error : " + err.message);
    }

});

authRouter.post("/logout", async (req,res)=>{

    res.cookie("token",null,{
        expires : new Date(Date.now())
    })
    res.send("Logout Successful");
});
module.exports = authRouter;