const express = require("express");
const connectDB = require("./config/database");
const app = express();
exports.app = app;
const cookie = require("cookie-parser");
const cors = require("cors");
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}));
app.use(express.json());
app.use(cookie());

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const connectionRouter = require("./routers/connection");
const userRouter = require("./routers/user");


//So by using the use what it will do it will go one by one in the each routes and will compare it with the request you have send like profile and anything else , first it will go to authRouter in auth router it will check if profile exists or not then it will go to profileRouter and will return the output as it encounter.
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",connectionRouter);
app.use("/",userRouter);



connectDB().then(()=>{
    console.log("DataBase is Connected .");
    app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...");
}) 
}).catch((err)=>{
    console.log("Database is not connected .");
    console.error(err);
});

 