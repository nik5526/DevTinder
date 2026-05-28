const mongoose = require("mongoose");

// we are using async await so that we can check if the connection is successfully established or not.
const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://nikhilrajy909_db_user:2csQNrnqDlNqcL30@nik.shkqfv8.mongodb.net/DevTinder"
    );
};

//then we are using then because the database will return a promise

module.exports = connectDB; 

