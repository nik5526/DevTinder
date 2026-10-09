const mongoose = require("mongoose");

// we are using async await so that we can check if the connection is successfully established or not.
const connectDB = async()=>{
    console.log(process.env.DB_CONNECTION_SECRET);
    await mongoose.connect(
       process.env.DB_CONNECTION_SECRET
    );
};

//then we are using then because the database will return a promise

module.exports = connectDB; 

