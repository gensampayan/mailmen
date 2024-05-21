import { Link, NavLink } from "react-router-dom"
import { FaUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import CartContext from "../state/CartContext";

function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

function fakeLogOut() {
  localStorage.removeItem("loggedin")
}

const { cart } = useContext(CartContext);
const showNotification = cart.length !== 0;

  return (
    <header>
      <div>
        <Link 
          className="site-logo"
          to="/"
        >
          UseHooks
        </Link>
      </div>
      <nav>
        <NavLink 
          to="/about-us"
          style={({ isActive }) => isActive ? activeStyles : null}
        >
          About Us
        </NavLink>
        <NavLink 
          to="/products"
          style={({ isActive }) => isActive ? activeStyles : null}
        >
          Products
        </NavLink>
      </nav>
      <div className="user-section">
        <Link
          onClick={fakeLogOut}
          className="login-link"
          to="login"
        >
          <FaUser 
            className="login-icon"
          />
        </Link>
        <Link
          className="cart-link"
          to="purchases"
        >
          {showNotification ? (
            <div className="cart-icon-container">
              <FaCartShopping className="cart-icon" />
              <span className="cart-notification">{cart.length}</span>
            </div>
          ) : (
            <FaCartShopping className="cart-icon" />
          )}
        </Link>
      </div>
    </header>
  )
}

export default Header