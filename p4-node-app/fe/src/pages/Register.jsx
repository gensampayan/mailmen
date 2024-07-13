import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import axiosCall from "../utils/axiosCall";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
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
      const data = await axiosCall("post", "users/register", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email_address: formData.email,
        password: formData.password
      });

      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email_address: formData.email
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoggedIn(true);
      setFormData(data);
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
            name="firstName"
            placeholder="First name"
            value={formData.firstname}
            onChange={handleChange}  
            className="w-96 p-3 rounded-md outline-none"
          />
          <input 
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}  
            className="w-96 p-3 rounded-md outline-none"
          />
          <input 
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}  
            className="w-96 p-3 rounded-md outline-none"
          />
          <input 
            type="text"
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
