import { NavLink } from 'react-router-dom';
import '../styles/auth.css';

const UserRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">User Registration</h1>
        <form className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
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
            Register
          </button>
        </form>
          <div className="auth-links">
            <div className="auth-link">
              Already have an account? <NavLink to="/user/login">Login here</NavLink>
            </div>
            <div className="auth-link">
              Want to be a food partner? <NavLink to="/foodpartener/register">Register as Partner</NavLink>
            </div>
          </div>
      </div>
    </div>
  );
};

export default UserRegister;