const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).send("Please login again!");
        }
    
        const validateToken = await jwt.verify(token,"nik@54321");
        const {_id} = validateToken;

        const user = await User.findById(_id);
        // now we are doing this so that this user value will store in the req.user and we can use this user in our app section as a shortcut.
        if(!user){
            throw new Error("User Not Found!");
        }

        req.user = user;
        next();
    }catch(err){
        res.status(400).send("Error : "+ err.message);
    }
}

module.exports = userAuth;