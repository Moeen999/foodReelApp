import { NavLink } from "react-router-dom";
import "../../styles/auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartnerRegister = () => {
  const [registerValues, setRegisterValues] = useState({
    bussinessname: "",
    contactname: "",
    phone: "",
    bussinessemail: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    const {
      bussinessname,
      contactname,
      phone,
      bussinessemail,
      password,
      address,
    } = registerValues;
    e.preventDefault();
    await axios.post(
      "http://localhost:3000/api/auth/foodpartener/register",
      {
        bussinessname,
        contactname,
        phone,
        bussinessemail,
        password,
        address,
      },
      {
        withCredentials: true,
      }
    );

    setRegisterValues({
      bussinessname: "",
      contactname: "",
      phone: "",
      bussinessemail: "",
      password: "",
      address: "",
    });
    navigate("/createfood");
  };
  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Food Partner Registration</h1>
          <form className="auth-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label">Business Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your business name"
                name="bussinessname"
                value={registerValues.bussinessname}
                onChange={(e) =>
                  setRegisterValues({
                    ...registerValues,
                    bussinessname: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your contact name"
                name="contactname"
                value={registerValues.contactname}
                onChange={(e) =>
                  setRegisterValues({
                    ...registerValues,
                    contactname: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-input"
                placeholder="Enter business phone number"
                name="phone"
                value={registerValues.phone}
                onChange={(e) =>
                  setRegisterValues({
                    ...registerValues,
                    phone: e.target.value,
                  })
                }
              />
            </div>
            <div className="emailPass">
              <div className="form-group">
                <label className="form-label">Business Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your business email"
                  name="bussinessemail"
                  value={registerValues.bussinessemail}
                  onChange={(e) =>
                    setRegisterValues({
                      ...registerValues,
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
                  placeholder="Create a password"
                  name="password"
                  value={registerValues.password}
                  onChange={(e) =>
                    setRegisterValues({
                      ...registerValues,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-input"
                placeholder="123 st. city Pakistan"
                name="address"
                value={registerValues.address}
                onChange={(e) =>
                  setRegisterValues({
                    ...registerValues,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit" className="auth-button">
              Register as Partner
            </button>
          </form>
          <div className="auth-links">
            <div className="auth-link">
              Already a partner?{" "}
              <NavLink to="/foodpartener/login">Login here</NavLink>
            </div>
            <div className="auth-link">
              Want to register as user instead?{" "}
              <NavLink to="/user/register">Register as User</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerRegister;
