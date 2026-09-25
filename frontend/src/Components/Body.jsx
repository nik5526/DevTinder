import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import {Base_Url} from "../utils/const";
import {useDispatch,useSelector} from "react-redux";
import {addUser} from "../utils/userSlice";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

const Body = ()=>{

    const userData = useSelector((store)=> store.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const viewProfile = async ()=>{
        try{
            const res = await axios.get(Base_Url + "/profile/view" , {withCredentials : true,});
            dispatch(addUser(res.data));
        }
        catch(err){
            if(err.status === 401){
                navigate("/signin");
            }
            console.error(err);
        }
    }
    useEffect(() => { 
        if(!userData){
            viewProfile();
        }
            
        },[]);
    return <>
        <div className = "flex min-h-screen flex-col " >
            <Navbar/>
            <Outlet/>
            <Footer/>
        
        </div>
    </>
}

export default Body;