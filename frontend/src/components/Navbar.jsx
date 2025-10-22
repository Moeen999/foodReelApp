import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("auth"));
    setAuth(stored);
  }, []);

  const logout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/user/login";
  };

  return (
    <nav className="navbar">
      <h1 className="logo">SnackShot</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {!auth && <Link to="/user/login">Login</Link>}
        {!auth && <Link to="/user/register">Register</Link>}

        {auth?.role === "partner" && (
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
