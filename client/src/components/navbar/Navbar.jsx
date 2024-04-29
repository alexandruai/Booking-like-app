import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">CristiBooking</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span>Welcome, {user.username}!</span>
            <Link to="/login" className="navButton">Logout</Link>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register" className="navButton">Register</Link>
            <Link to="/login" className="navButton">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;