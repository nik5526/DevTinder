const express = require("express");
const connectionRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connection");
const User = require("../models/user");

connectionRouter.post("/request/send/:status/:toUserId", userAuth ,async (req,res)=>{

    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested" , "ignored"]

        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message : "Status type is not Valid! "
            });
        }

        const validUser = await User.findById(toUserId);
        if(!validUser){
            return res.status(400).json({
                message : "User not found! "
            });
        }
        // this will give us a value like undefined and something else.
        //The database will give error if we have not set this check in our api , but it will give error only if the fromId and toId is same means if we switch the id then database  will not give the error. 
        const connectionAlreadySent = await ConnectionRequest.findOne({
            //this or operator give us by mongoose it is not given by js.

            $or : [
                {fromUserId , toUserId},
                {fromUserId : toUserId , toUserId : fromUserId}
            ]
        });
        //it will give error if the user has already sent the request .
        if(connectionAlreadySent){
            return res.status(400).json({
                messsage : "Request was already sent"
            });
        }

        const connectionSchema = new ConnectionRequest({
        fromUserId , toUserId , status,
        })

        await connectionSchema.save();

        if(status === "interested"){
            res.json({
            message : req.user.firstName + " is "+ status + " to work with "+ validUser.firstName,
            connectionSchema,
        });
        }
        else{
            res.json({
            message : req.user.firstName + " has "+ status +" "+ validUser.firstName + " request.",
            connectionSchema,
        });
        }
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }

})

connectionRouter.post("/request/receive/:status/:fromUserId" ,userAuth ,async (req,res)=>{
    try{
        // So here is the first thing that we have to keep in mind that the login user must be toUserId one means only he can see who has sent him the request and wheather to accept it or reject it .
        const loginUser = req.user;
        const {status, requestId } = req.params;
        //there must be an edge case to protect the status 
        const validStatus = ["accepted" , "rejected"];
        if(!validStatus.includes(status)){
            return res.status(400).json({
            message : ststus + " is not valid!"
            });
        }
        // here we should work on if the status is interested than only it will work. 
        const connectionAlreadySent = await ConnectionRequest.findOne({
            _id : requestId ,
            toUserId : loginUser._id,
            status : "interested"
        });
        if(!connectionAlreadySent){
            return res.status(400).json({
                message : " User is not in the database."
            });
        }
        connectionAlreadySent.status = status;
        await connectionAlreadySent.save();

        res.json({
            message : "Request is Accepted",
            connectionAlreadySent
        });
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }

});

module.exports = connectionRouter; 