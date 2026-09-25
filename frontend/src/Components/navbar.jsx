import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../utils/const";
import {removeUser} from "../utils/userSlice";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const Navbar = () => {

  //it will keep the ui clean.
  const user = useSelector((store) => store.user);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        Base_Url + "/logout",
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUser());
      return navigate("/signin");
    } catch (err) {
      
    }
  };

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm px-5">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            DevTinder
          </Link>
        </div>
        {user ? (
          <div className="flex mr-2">
            <div className="dropdown dropdown-end flex items-center gap-3">
              <span>Hi, {user.firstName}</span>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar "
              >
                <div className="w-10 rounded-full">
                  <img alt="user profile picture" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick ={handleLogout} >Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Navbar;
