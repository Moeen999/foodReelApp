import { NavLink } from 'react-router-dom';
import '../styles/auth.css';

const PartnerRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Food Partner Registration</h1>
        <form className="auth-form">
          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your business name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Business Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your business email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-input"
              placeholder="Enter business phone number"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Create a password"
            />
          </div>
          <button type="submit" className="auth-button">
            Register as Partner
          </button>
        </form>
          <div className="auth-links">
            <div className="auth-link">
              Already a partner? <NavLink to="/foodpartener/login">Login here</NavLink>
            </div>
            <div className="auth-link">
              Want to register as user instead? <NavLink to="/user/register">Register as User</NavLink>
            </div>
          </div>
      </div>
    </div>
  );
};

export default PartnerRegister;