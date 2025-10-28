import { NavLink } from "react-router-dom";
import "../../styles/auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [userRegisterValues, setUserRegisterValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    const {firstName , lastName , email , password} = userRegisterValues;
    e.preventDefault();
    await axios.post("http://localhost:3000/api/auth/user/register", {
      fullName:firstName + " " + lastName,
      email,
      password
    },{
      withCredentials:true  
    });
    setUserRegisterValues({
      firstName:"",
      lastName:"",
      email:"",
      password:"" 
    })
    navigate("/");
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">User Registration</h1>
        <form className="auth-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your first name"
              name="firstName"
              value={userRegisterValues.firstName}
              onChange={(e) =>
                setUserRegisterValues({
                  ...userRegisterValues,
                  firstName: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your last name"
              name="fullName"
              value={userRegisterValues.lastName}
              onChange={(e) =>
                setUserRegisterValues({
                  ...userRegisterValues,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              name="email"
              value={userRegisterValues.email}
              onChange={(e) =>
                setUserRegisterValues({
                  ...userRegisterValues,
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
              placeholder="Create a password"
              name="password"
              value={userRegisterValues.password}
              onChange={(e) =>
                setUserRegisterValues({
                  ...userRegisterValues,
                  password: e.target.value,
                })
              }
            />
          </div>
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
        <div className="auth-links">
          <div className="auth-link">
            Already have an account?
            <NavLink to="/user/login">Login here</NavLink>
          </div>
          <div className="auth-link">
            Want to be a food partner?
            <NavLink to="/foodpartener/register">Register as Partner</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
