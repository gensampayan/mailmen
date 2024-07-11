import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-end w-full p-5 bg-custom-blue">
      <div className="bg-white p-3 mx-3 cursor-pointer hover:bg-black hover:text-white transition duration-300 rounded"> 
        <NavLink
          to="/login"
        >
          Sign in
        </NavLink>
      </div>
      <div className="bg-white p-3 mx-3 cursor-pointer hover:bg-black hover:text-white transition duration-300 rounded"> 
        <NavLink
          to="/register"
        >
          Create an account
        </NavLink>
      </div>
    </header>
  )
}

export default Header;
