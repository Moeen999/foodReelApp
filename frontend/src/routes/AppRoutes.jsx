import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import PartnerLogin from "../pages/PartnerLogin";
import PartnerRegister from "../pages/PartnerRegister";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartener/login" element={<PartnerLogin />} />
        <Route path="/foodpartener/register" element={<PartnerRegister />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
