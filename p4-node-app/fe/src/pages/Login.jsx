import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, login] = useLogin();

  const userCredentials = {
    email,
    password
  }

  return (
    <div className="flex justify-around m-20 py-28 h-96 bg-gray-200 rounded-lg">
      <div>
        <p className="text-4xl mb-1">
          Sign in
        </p>
        <p>
          to continue to <Link to="/" className="text-custom-blue">Mailmen</Link>
        </p>
      </div>
      <div>
        <form 
          onSubmit={(e) => login(e, userCredentials)}
          className="flex flex-col gap-5"
        >
          <input 
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
            className="w-96 p-3 rounded-md outline-none"
          />
          <input 
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
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
              to="/register"
              className="text-custom-blue"
            >
            Create an account
            </Link> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
