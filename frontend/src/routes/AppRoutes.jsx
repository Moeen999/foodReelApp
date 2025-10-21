import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import PartnerLogin from "../pages/auth/PartnerLogin";
import PartnerRegister from "../pages/auth/PartnerRegister";
import Home from "../pages/general/Home";
import CreateFood from "../pages/food-partener/CreateFood";
import FoodPartnerProfile from "../pages/food-partener/Profile";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartener/login" element={<PartnerLogin />} />
        <Route path="/foodpartener/register" element={<PartnerRegister />} />
        <Route path="/" element={<Home />} />
        <Route path="/createfood" element={<CreateFood/>}/>
        <Route path="/foodpartener/:id" element={<FoodPartnerProfile/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
