const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const userAuth = require("../middlewares/auth");
const {UpdateProfile} = require("../utils/ValidateSignup");

profileRouter.get("/profile/view", userAuth , async (req,res)=>{
    try{
        
        const user = req.user;
        
        res.send(user);

    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

profileRouter.patch("/profile/edit", userAuth ,async (req,res)=>{
    try{

        if(!UpdateProfile(req)){
            throw new Error("This data can't be edited ");
        }
        //this req.user comes from the userAuth
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key)=> loggedInUser[key] = req.body[key]);

        await loggedInUser.save();
        res.send(`${loggedInUser.firstName} your profile is successfully updated  `);
    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
});
module.exports = profileRouter;