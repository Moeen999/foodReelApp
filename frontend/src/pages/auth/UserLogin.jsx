import { NavLink } from "react-router-dom";
import "../../styles/auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const [userLoginValues, setUserLoginValues] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    const { email, password } = userLoginValues;
    e.preventDefault();
  const response =  await axios.post("http://localhost:3000/api/auth/user/login", {
      email,
      password,
    }, {
      withCredentials: true
    });

    setUserLoginValues({
      email: "",
      password: "",
    });
    localStorage.setItem(
      "auth",
      JSON.stringify({
        role: "user", 
        id: response.data.user._id,
      })
    );
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">User Login</h1>
        <form className="auth-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              name="email"
              value={userLoginValues.email}
              onChange={(e) =>
                setUserLoginValues({
                  ...userLoginValues,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              name="password"
              value={userLoginValues.password}
              onChange={(e) =>
                setUserLoginValues({ ...userLoginValues, password: e.target.value })
              }
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <div className="auth-link">
          Don't have an account?{" "}
          <NavLink to="/user/register">Register here</NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
