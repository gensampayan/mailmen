import AuthContext from "../contexts/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosCall from "../../utils/axiosCall";

const useLogin = () => {
  const {setIsLoggedIn, setUser} = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e, credentials) => {
    try {
      e.preventDefault();

      const {
        data: { data }
      } = await axiosCall("post", "users/login", {
        email_address: credentials.email,
        password: credentials.password
      });

      const userData = {
        email: credentials.email
      };

      console.log("login")
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoggedIn(true)
      setUser(data)
      navigate("/")
    } catch(error) {
      console.error(error)
      setError(error);
    }
  }

  return [error, handleLogin];
}

export default useLogin;
