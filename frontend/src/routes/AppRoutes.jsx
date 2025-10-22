import { Route, Routes, Navigate } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import PartnerLogin from "../pages/auth/PartnerLogin";
import PartnerRegister from "../pages/auth/PartnerRegister";
import Home from "../pages/general/Home";
import CreateFood from "../pages/food-partener/CreateFood";
import FoodPartnerProfile from "../pages/food-partener/Profile";
import Navbar from "../components/Navbar";

function ProtectedRoute({ children, allowedRoles }) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth) return <Navigate to="/user/login" />;
  if (allowedRoles && !allowedRoles.includes(auth.role)) return <Navigate to="/" />;
  return children;
}

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartener/login" element={<PartnerLogin />} />
        <Route path="/foodpartener/register" element={<PartnerRegister />} />

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
            <ProtectedRoute allowedRoles={["partner"]}>
              <FoodPartnerProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
