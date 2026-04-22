import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import PartnerLogin from "../pages/auth/PartnerLogin";
import PartnerRegister from "../pages/auth/PartnerRegister";
import Home from "../pages/general/Home";
import CreateFood from "../pages/food-partener/CreateFood";
import FoodPartnerProfile from "../pages/food-partener/Profile";
import Navbar from "../components/Navbar";
import useAuth from "../context/useAuth";
import { Toaster } from "react-hot-toast";

function ProtectedRoute({ children, allowedRoles }) {
  const { auth } = useAuth();
  if (!auth) return <Navigate to="/user/login" />;
  if (allowedRoles && !allowedRoles.includes(auth.role))
    return <Navigate to="/" />;
  return children;
}

function PublicRoute({ children }) {
  const { auth } = useAuth();
  const location = useLocation();
  if (auth) return <Navigate to="/" replace />;
  return children;
}

const AppRoutes = () => {
  return (
    <>
      <Toaster position="bottom-right" />
      <Navbar />
      <Routes>
        <Route
          path="/user/register"
          element={
            <PublicRoute>
              <UserRegister />
            </PublicRoute>
          }
        />
        <Route
          path="/user/login"
          element={
            <PublicRoute>
              <UserLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/foodpartener/login"
          element={
            <PublicRoute>
              <PartnerLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/foodpartener/register"
          element={
            <PublicRoute>
              <PartnerRegister />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["user", "partner"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createfood"
          element={
            <ProtectedRoute allowedRoles={["partner"]}>
              <CreateFood />
            </ProtectedRoute>
          }
        />

        <Route
          path="/foodpartener/:id"
          element={
            <ProtectedRoute allowedRoles={["user", "partner"]}>
              <FoodPartnerProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
