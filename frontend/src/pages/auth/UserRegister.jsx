import { NavLink } from "react-router-dom";
import "../../styles/auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserRegister = () => {
  const [userRegisterValues, setUserRegisterValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    const { firstName, lastName, email, password } = userRegisterValues;
    e.preventDefault();
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/user/register`,
      {
        fullName: firstName + " " + lastName,
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    toast.success(response.data.message || "Registration successful!");
    setUserRegisterValues({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    navigate("/");
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Register as User</h1>
        <form className="auth-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              required={true}
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
              required={true}
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
              required={true}
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
              required={true}
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
