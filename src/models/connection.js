const mongoose = require("mongoose");

const connectionRequestSchema  = new mongoose.Schema({
    fromUserId : {

        //by using this we can 
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : ["ignored", "interested" , "accepted" , "rejected"],
            message : `{VALUE} is incorrect status type `,
        }
    }
},
{
    timestamps : true,
});
//compound indexing
connectionRequestSchema.index({fromUserId : 1, toUserId : 1});

// this fuction will always called anytime the object is saved, means in connection router we are saving connectionSchema so it will run everytime before the connectionSchema is saved.
connectionRequestSchema.pre("save",function (){
    //here this is the window 
    const connectionRequest = this;
    //we cant directly comapare fromUserId and toUserId so we use this method to do so.
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Sender and Receivers UserID is same . ");
    }
    
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);