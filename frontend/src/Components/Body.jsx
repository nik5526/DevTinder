import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import {Base_Url} from "../utils/const";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";
import {useNavigate} from "react-router-dom";

const Body = ()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const viewProfile = async ()=>{
        try{
            const res = axios.get(Base_Url + "/profile/view" , {withCredentials : true});
            dispatch(addUser(res.data));
            navigate("/profile/view");
        }
        catch(err){
            console.log(err);
        }
    }
    return <>
        <div className = "flex min-h-screen flex-col " >
            <Navbar/>
            <Outlet/>
            <Footer/>
        
        </div>
    </>
}

export default Body;