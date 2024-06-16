import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import "../../Styles/AuthStyles.css";
import { useNavigate,useLocation } from "react-router-dom";
import {useAuth} from "../../Context/Auth";
import base_url from "../../utils/api";
import { Link } from "react-router-dom";
import GoogleSign from "./GoogleSign";

const Login = () => {
      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [auth,setAuth] = useAuth();
      const navigate = useNavigate();
      const location = useLocation();

      //form function
      const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${base_url}/api/v1/auth/login`,{email,password});
            if(res && res.data.success)
            {
                toast.success(res && res.data.message);
                setAuth({
                  ...auth,
                  user: res.data.user,
                  token: res.data.token,
                });
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state || "/");
            }
            else
            {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
      }
      
  return (
    <Layout title="Login - Apni Dukaan">
      <div className="form-container text-center mb-5" style={{ minHeight: "60vh"}}>
        <form onSubmit={handleSubmit}>
        <h4 className="title">Login</h4>
          <div className="mb-4">
            <input
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-4" style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
           {/* <Link to="/forgot-password" className="links">Forgot Password?</Link> */}
           <Link to="/register" className="links">Don't have a account ? Register</Link>
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Login
          </button>
          <div className="mb-2 form-control">
            <GoogleSign/>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
