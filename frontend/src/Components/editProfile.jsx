import {useState} from "react";
import FeedCard from "./FeedCard";

const EditProfile = ({user}) => {
  

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);

  return (
    <div className="w-full flex justify-center py-10 ">
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
        
        <button
          className=" bg-blue-900 p-3 rounded-xl cursor-pointer hover:bg-blue-800 "
        >
          Save Profile
        </button>
      </div>
      <FeedCard user={{firstName,lastName,age,gender,photoUrl,about}}/>
    </div>

  );
};
export default EditProfile;