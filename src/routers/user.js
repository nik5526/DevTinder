const express = require("express");
const userRouter = express.Router();

const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connection");
const User = require("../models/user"); 

const Safe_Populate_Method = "firstName lastName age gender photoUrl";

userRouter.get("/user/request/received",userAuth,async (req,res)=>{
    try{
        const loginUser = req.user;

        const ConnectionRequestReceived = await ConnectionRequest.find({
            toUserId : loginUser._id,
            status : "interested", 
        }).populate("fromUserId" , ["firstName" , "lastName" , "age" , "gender" , "photoUrl"]);

        res.json({
            message : "Connection Request received are... ",
            data : ConnectionRequestReceived
        });
    }catch(err){
        res.status(450).send("Error : " + err.message);
    }
});

userRouter.get("/user/connection",userAuth,async (req,res)=>{
    try{
        const loggedUser = req.user;

        const connectionsWith = await ConnectionRequest.find({
            $or :[
                {toUserId : loggedUser._id , status : "accepted"},
                {fromUserId : loggedUser._id , status : "accepted"},
            ]
        }).populate("fromUserId" , Safe_Populate_Method).populate("toUserId" ,Safe_Populate_Method );

        const data = connectionsWith.map((row) => {
            //we are using if statement as we have to only display the one who we are connected to display. And we are using to string after the compare statement because these id's are of mongoose and we can't compare them directly so first we have to convert them to string.
            if(row.toUserId.toString() === loggedUser._id.toString()){
                return row.fromUserId;
            }
            return row.toUserId;
            });

        res.json({
            message :  "Connections are ....",
            data : data
        });
    }catch(err){
        res.status(450).send("Error : " + err.message);
    }
});

userRouter.get("/user/feed" , userAuth ,async (req,res)=>{

    try{
        const loggedUser = req.user;

        const User_Safe_Data = ["firstName" , "lastName" , "age" , "gender" , "photoUrl"];
 
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = (limit > 50) ? 50 : limit ;
        const skip = (page-1) * limit;

        const connectionRequests = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedUser._id},
                {toUserId : loggedUser._id}
            ]
        }).select("fromUserId toUserId")
        //.populate("fromUserId" , "firstName").populate("toUserId" , "firstName"); this will tell us the names .

        //as we can see the results now we have the id's of the users and now we can keep them in data structure set as it store the data and ignore the duplicate data are entered .By using this we can handle the the feed we want to see.

        const hideUsersFromFeed  = new Set();

        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

       //console.log(hideUsersFromFeed);

        //Now what we will do is we will find all the users that are not in the hideUsersFromFeed and we will display them on the feed.
        // we will add an and statement so that we can't see our own card in the feed.
        //$nin - not in this array , $ne - not equals to .
        const usersInFeed = await User.find({
            $and : [
               { _id : { $nin : Array.from(hideUsersFromFeed)}},
               { _id : { $ne : loggedUser._id}}
            ]
        }).select(User_Safe_Data).skip(skip).limit(limit);

    res.json({
        data : usersInFeed
    });

    }catch(err){
        res.status(460).send("Error : " + err.message);
    }
    
});
module.exports = userRouter;