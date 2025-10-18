import { NavLink } from "react-router-dom";
import "../styles/auth.css";

const UserLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">User Login</h1>
        <form className="auth-form">
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
              placeholder="Enter your password"
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
