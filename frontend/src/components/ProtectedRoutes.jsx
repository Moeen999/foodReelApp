import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth) return <Navigate to="/login" replace />;
  if (role && auth.role !== role) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
