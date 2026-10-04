import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../utils/const";

const SignIn = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = async () => {
    try {
      const res = await axios.post(
        Base_Url + "/login",
        { emailId, password },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  
  const userSignUp = async ()=>{
    try{
      const res = await axios.post(Base_Url + "/signup" , {firstName , lastName , emailId , password , age , gender , photoUrl, about},{withCredentials : true});
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong");
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center my-3" >
      <div className="bg-gray-950 w-full max-w-sm p-6 rounded-lg text-center shadow-lg space-y-6">
        <h2 className="text-gray-400 font-semibold text-2xl">{isSignIn ? "SignIn" : "SignUp"}</h2>

        { !isSignIn &&
          <>
            <fieldset className="fieldset">
              <label className="label" htmlFor="firstName">
                First Name
              </label>

              <input
                type="text"
                value={firstName}
                id="firstName"
                className="input"
                placeholder="xyz"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="LastName">
                Last Name
              </label>

              <input
                type="text"
                value={lastName}
                id="LastName"
                className="input"
                placeholder="xyz"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="age">
                Age
              </label>

              <input
                type="text"
                value={age}
                id="age"
                className="input"
                placeholder="23"
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="gender">
                Gender 
              </label>

              <input
                type="text"
                value={gender}
                id="gender"
                className="input"
                placeholder="xyz"
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="photoUrl">
                PhotoUrl
              </label>

              <input
                type="text"
                value={photoUrl}
                id="photoUrl"
                className="input"
                placeholder="photo"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="about">
                About
              </label>

              <input
                type="text"
                value={about}
                id="about"
                className="input"
                placeholder="xyz"
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
          </>
        }

        <fieldset className="fieldset">
          <label className="label" htmlFor="email">
            Email Id - {emailId}
          </label>

          <input
            type="text"
            value={emailId}
            id="email"
            className="input"
            placeholder="xyz@gmail.com"
            onChange={(e) => setEmailId(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <label className="label" htmlFor="pass">
            Password
          </label>

          <input
            type="password"
            value={password}
            id="pass"
            className="input"
            placeholder="abc*****"
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="font-semibold text-red-600">{error}</p>
        </fieldset>

        <button
          className="bg-blue-900 p-3 rounded-xl cursor-pointer hover:bg-blue-800"
          onClick={isSignIn ? userLogin : userSignUp}
        >
          {isSignIn ? "SignIn" : "SignUp"}
        </button>
        <p className = "text-sm -m-2 cursor-pointer text-blue-800" onClick = {()=> setIsSignIn((value)=> !value)}
        >{isSignIn ? "New User? SignUp" : "Existing User? SignIn"}</p>
      </div>
    </div>
  );
};

export default SignIn;
