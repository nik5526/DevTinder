const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const  userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 20,
    },
    lastName : {
        type : String,
        minLength : 3,
        maxLength : 15,
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true, 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(" Email id is not validate ");
            }
        },
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error(" Password is not strong ");
            }
        }
    },
    age : {
        type : String,
        min : 18,
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Data not valid");
            }
        }

    },
    photoUrl : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("URL is not valid");
            }
        }
    },
},{
    timestamps : true,
});

//dont use arrow function here otherwise it will messup.
userSchema.methods.getJWT = async function() {
    const user = this;

    const token = await jwt.sign({_id : user._id},"nik@54321",{expiresIn : '1d'});

    return token;
}

userSchema.methods.isVerified = async function(passwordEnteredByUser) {
    const user = this;
    const passwordHash = user.password;
    const isValid = await bcrypt.compare(passwordEnteredByUser , passwordHash);

    return isValid;
}

// The model name should be capital because it defines the model of mongoose.
module.exports = mongoose.model("User",userSchema);
