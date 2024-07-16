import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import axiosCall from "../utils/axiosCall";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axiosCall("post", "users/register", formData);
      
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setUser(data);
      navigate("/login")
    } catch(error) {
      console.error(error)
      setError(error);
    }
  }

  return (
    <div className="flex justify-around m-20 py-28 h-5/6 bg-gray-200 rounded-lg">
      <div>
        <p className="text-4xl mb-1">
          Sign up
        </p>
        <p>
          to continue to <Link to="/" className="text-custom-blue">Mailmen</Link>
        </p>
      </div>
      <div>
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <input 
            type="text"
            name="first_name"
            placeholder="First name"
            value={formData.first_name}
            onChange={handleChange}  
            className="w-96 p-3 rounded-md outline-none"
          />
          <input 
            type="text"
            name="last_name"
            placeholder="Last name"
            value={formData.last_name}
            onChange={handleChange}  
            className="w-96 p-3 rounded-md outline-none"
          />
          <input 
            type="text"
            name="email_address"
            placeholder="Email"
            value={formData.email_address}
            onChange={handleChange}  
            className="w-96 p-3 rounded-md outline-none"
          />
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}  
            className="w-96 p-3 rounded-md outline-none"
          />
          { error && <p>{error}</p>}
          <button
              type="submit"
              className="p-3 w-96 rounded text-white bg-custom-blue"
            >
              Submit
            </button>
        </form>
        <div className="flex justify-around items-center mt-5">
          <div>
            <Link 
              to="/login"
              className="text-custom-blue"
            >
            Already have account
            </Link> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
