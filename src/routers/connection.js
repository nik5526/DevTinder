const express = require("express");
const connectionRouter = express.Router();
const User = require("../models/user");
const userAuth = require("../middlewares/auth");

connectionRouter.post("/sendConnectionRequest", userAuth , (req,res)=>{

    const user = req.user;
    const {firstName} = user;
    res.send("Connection request send by " + firstName);
})

module.exports = connectionRouter; 