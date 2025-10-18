const foodPartenerModel = require("../models/foodpartener.model.js");
const jwt = require("jsonwebtoken");

async function authFoodPartenerMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please log In first!",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartener = await foodPartenerModel.findById(decodedToken.id);
    req.foodPartener = foodPartener;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token!",
    });
  }
}

module.exports = { authFoodPartenerMiddleware };
