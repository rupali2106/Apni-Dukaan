import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import base_url from "../../utils/api";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
  
export default function GoogleSign() {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

    const responseMessage = async (response) => {
        try {
          const decode = jwt_decode(response.credential)
          const email = decode.email;
          const name = decode.given_name + " " + decode.family_name;
          const res = await  axios.post(`${base_url}/api/v1/auth/google_sign`,{name,email});
          if (res && res.data.success) {
            toast.success(res && res.data.message);
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state || "/");
          } else {
            toast.error(res.data.message);
          }
  
        } catch (error) {
          console.log(error);
        }
    }
    const errorMessage = (error) => {
            console.log(error)
    }
  
  return (
    <div>
      <GoogleOAuthProvider clientId="424628057817-1g0ea2qid9n79o9fmlgbr16bc0lccqg1.apps.googleusercontent.com">
     <GoogleLogin  onSuccess={responseMessage} onError={errorMessage} />
     </GoogleOAuthProvider>
    </div>
  );
}