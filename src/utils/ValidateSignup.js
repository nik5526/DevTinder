const validator = require("validator");
const User = require("../models/user");

const ValidateSignup = (req)=>{
    const {firstName , lastName , emailId , password} = req.body;

    if(![firstName || lastName]){
        throw new Error(" Enter a valid Name ");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error(" Email is not valid ");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error(" Please enter a strong password. ");
    }

    //you can add many more validators just like them.
};

const UpdateProfile = (req)=>{
    const ApprovedChanges = [
        "firstName" , "lastName" , "age" , "gender" ,"photoUrl" , "about"
    ];


   return Object.keys(req.body).every((k)=> ApprovedChanges.includes(k));
}



module.exports = {ValidateSignup , UpdateProfile } ;