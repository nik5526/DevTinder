const validator = require("validator");

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

module.exports = ValidateSignup ;