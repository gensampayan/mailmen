import AuthContext from "../contexts/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosCall from "../utils/axiosCall";

const useLogin = () => {
  const {setIsLoggedIn, setUser} = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e, credentials) => {
    try {
      e.preventDefault();

      const { data } = await axiosCall("post", "users/login", 
        {
        email_address: credentials.email,
        password: credentials.password
      });

      localStorage.setItem("token", data.token);
      setIsLoggedIn(true)
      setUser(data)
      navigate("/mailbox")
    } catch(error) {
      console.error(error)
      setError(error);
    }
  }

  return [error, handleLogin];
}

export default useLogin;
