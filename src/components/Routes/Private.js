import {useState, useEffect} from "react";
import {useAuth} from "../../Context/Auth";
import {Outlet} from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import base_url from "../../utils/api";

export default function PrivateRoute(){
    const [ok,setOk] = useState(false); 
    const [auth,setAuth] = useAuth();
    useEffect(()=>{
        const authCheck = async() =>{
            const data = localStorage.getItem('auth')
            const parseData = JSON.parse(data)
            const res = await axios.get(`${base_url}/api/v1/auth/user-auth`, {
                headers: {
                    Authorization: parseData.token
                }
            })
            if(res.data.ok){
                setOk(true)
            }
            else
            {
                setOk(false)
            } 
        }
        if(auth?.token) authCheck()
    },[auth?.token])
    return ok ? <Outlet/> :<Spinner/>
}