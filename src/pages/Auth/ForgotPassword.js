import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import "../../Styles/AuthStyles.css";
import { useNavigate } from "react-router-dom";
import base_url from "../../utils/api";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
      const [email,setEmail] = useState("");
      const [question,setQuestion] = useState("");
      const [newPassword,setNewPassword] = useState("");
      const navigate = useNavigate();

      //form function
      const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${base_url}/api/v1/auth/forgot-password`,{email,question,newPassword});
            if(res && res.data.success)
            {
                toast.success(res && res.data.message);
                navigate("/login");
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
    <Layout title="ForgotPassword - Apni Dukaan">
      <div className="form-container text-center" style={{ minHeight: "55vh"}}>
        <form onSubmit={handleSubmit}>
        <h4 className="title">Forgot</h4>
          <div className="mb-4">
            <input
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={question}
              onChange={(e)=>setQuestion(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Your Favourite Book"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="New Password"
              required
            />
          </div>
          <div className="mb-4" style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
           <Link to="/login" className="links" style={{marginLeft:"7px"}}>Login</Link>
           <Link to="/register" className="links" style={{marginRight:"7px"}}>Register</Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
