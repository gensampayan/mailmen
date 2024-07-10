import AuthContext from "../contexts/AuthContext";
import { useState } from "react";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  )
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.setItem("user")) : {}
  )

  const state = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser
  }

  return (
    <AuthContext.Provider 
      value={state}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
