import { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Base_Url } from "../utils/const";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [toast,setToast] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    //this one is to set the error to null if data entered correct.
    setError("");
    try {
      const res = await axios.patch(
        Base_Url + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(()=>{
        setToast(false);
      },4000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-10">
        <div className="bg-gray-950 w-full max-w-md p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-gray-400 font-semibold text-2xl">Edit Profile</h2>
          <fieldset className="fieldset">
            <label className="label" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              id="firstName"
              className="input"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              id="lastName"
              className="input"
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              value={age}
              id="age"
              className="input"
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
              onChange={(e) => setGender(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label" htmlFor="url">
              Photo Url
            </label>
            <input
              type="url"
              value={photoUrl}
              id="url"
              className="input"
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
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>

          <p className="text-red-600">{error}</p>

          <div className="flex justify-center">
            <button
              className="bg-blue-900 p-3 rounded-xl cursor-pointer hover:bg-blue-800 min-w-[180px]}"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>
        <div className="w-full max-w-3xl">
          <FeedCard
            user={{ firstName, lastName, age, gender, photoUrl, about }}
          />
        </div>
      </div>

      {toast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Updated Successfully.</span>
        </div>
      </div>}
    </>
  );
};
export default EditProfile;
