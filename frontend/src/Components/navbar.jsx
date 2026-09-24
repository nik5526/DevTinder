import {useSelector} from "react-redux";


const Navbar = () => {
  //it will keep the ui clean.
  const user = useSelector((store) => store.user );
  
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm px-5">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DevTinder</a>
        </div>
        {user ?
        (<div className="flex mr-2">
          <div className="dropdown dropdown-end flex items-center gap-3"> 
           <span>Hi, {user.firstName}</span> 
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar "
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user profile picture"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>) : null}
      </div>
    </>
  );
};

export default Navbar;