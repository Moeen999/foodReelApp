import { NavLink } from "react-router-dom";
import "../../styles/auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";
const PartnerLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [partenerLoginValues, setpartenerLoginValues] = useState({
    bussinessemail: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    const { bussinessemail, password } = partenerLoginValues;
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/auth/foodpartener/login",
      {
        bussinessemail,
        password,
      },
      {
        withCredentials: true,
      }
    );
    setpartenerLoginValues({
      bussinessemail: "",
      password: "",
    });
    const newAuth = {
      role: "partner",
      id: response.data.foodPartener._id,
    };
    localStorage.setItem("auth", JSON.stringify(newAuth));
    setAuth(newAuth);
    navigate("/")
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Food Partner Login</h1>
        <form className="auth-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your business email"
              name="partenerLoginValues"
              value={partenerLoginValues.bussinessemail}
              onChange={(e) =>
                setpartenerLoginValues({
                  ...partenerLoginValues,
                  bussinessemail: e.target.value,
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
              value={partenerLoginValues.password}
              onChange={(e) =>
                setpartenerLoginValues({
                  ...partenerLoginValues,
                  password: e.target.value,
                })
              }
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <div className="auth-link">
          Not a partner yet?
          <NavLink to="/foodpartener/register">Register here</NavLink>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
