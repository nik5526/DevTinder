const mongoose = require("mongoose");

const  userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true, 
    },
    password : {
        type : String,
        required : true, 
    },
    age : {
        type : String
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Data not valid");
            }
        }

    }
},{
    timestamps : true,
});

// The model name should be capital because it defines the model of mongoose.
const User = mongoose.model("User",userSchema);

module.exports = User;