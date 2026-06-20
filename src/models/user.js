const mongoose = require("mongoose");
const validator = require("validator");

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

// The model name should be capital because it defines the model of mongoose.
const User = mongoose.model("User",userSchema);

module.exports = User;