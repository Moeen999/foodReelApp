import { Link, NavLink } from "react-router-dom";
import { useCallback } from "react";
import "../styles/navbar.css";
import useAuth from "../context/useAuth";

const Navbar = () => {
  const { auth, setAuth } = useAuth();

  const logout = useCallback(() => {
    localStorage.removeItem("auth");
    setAuth(null);
    window.location.href = "/user/login";
  }, [setAuth]);

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">TasteStream</NavLink>
      <div className="nav-links">
        {auth && <Link to="/">Home</Link>}
        {!auth && <Link to="/user/login">Login</Link>}
        {!auth && <Link to="/user/register">Register</Link>}

        {auth?.role == "partner" && (
          <>
            <Link to="/createfood">Create Food</Link>
            <Link to={`/foodpartener/${auth.id}`}>Profile</Link>
          </>
        )}

        {auth && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
