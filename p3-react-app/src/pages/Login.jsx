import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

function Login() {
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/";

  async function handleSubmit(e) {
    e.preventDefault();

    if (!loginFormData.email || !loginFormData.password) {
      setError({ message: "Please fill in both email and password fields" });
      return;
    }

    setStatus("submitting");
    try {
      const data = await loginUser(loginFormData);

      setError(null); 
      localStorage.setItem("token", data.token); 
      localStorage.setItem("loggedin", "true");

      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage = err?.message || "An error occurred during login.";
      setError({ message: errorMessage });
    } finally {
      setStatus("idle");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="login-container">
      {location.state?.message && <h3 className="login-error">{location.state.message}</h3>}
      <h1>Sign in to your account</h1>
      {error?.message && <h3 className="login-error">{error.message}</h3>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

export default Login;