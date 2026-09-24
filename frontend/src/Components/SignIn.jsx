import {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";
import {useNavigate} from "react-router-dom";
import {Base_Url} from "../utils/const";


const SignIn = () => {

    const [emailId , setEmailId] = useState("bhuvnesh@gmail.com");
    const [password , setPassword] = useState("Bhuvnesh@54321");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userLogin = async ()=>{
        try{
            const res = await axios.post(Base_Url + "/login" , 
                {emailId , password},
                { withCredentials: true }
            )
            
            dispatch(addUser(res.data));
            return navigate("/");
        }catch(err){
            console.log("Error : " + err.message);
        }
        
    }
    
  return (
    <div className="flex flex-1 items-center justify-center my-auto ">
      <div className="bg-gray-950 w-full max-w-sm p-6 rounded-lg text-center shadow-lg space-y-6">
        <h2 className="text-gray-400 font-semibold text-2xl">SignIn</h2>
        <fieldset className="fieldset">
          <label className="label" htmlFor="email">
            Email Id - {emailId}
          </label>
          <input
            type="text"
            value = {emailId}
            id="email"
            className="input"
            placeholder="xyz@gmail.com"
            onChange = {(e)=> setEmailId(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label" htmlFor="pass">
            Password
          </label>
          <input
            type="text"
            value = {password}
            id="pass"
            className="input"
            placeholder="abc***** "
            onChange = {(e)=> setPassword(e.target.value)}
          />
        </fieldset>
        <button className=" bg-blue-900 p-3 rounded-xl cursor-pointer hover:bg-blue-800" 
        onClick = {userLogin}>Sign In</button>
      </div>
    </div>
  );
};

export default SignIn;
