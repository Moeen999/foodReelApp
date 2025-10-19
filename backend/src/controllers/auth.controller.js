const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const foodPartenerModel = require("../models/foodpartener.model.js");
//! user Auth Controller's
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
  const isUserAlreadyExists = await userModel.findOne({ email });
  if (isUserAlreadyExists) {
    return res.status(400).send("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign(
    {
      userID: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);

  res.status(201).send({
    message: "User registered successfully",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  const isPassValid = await bcrypt.compare(password, user.password);

  if (!isPassValid) {
    return res.status(400).send("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.cookie("token", token);
  res.status(200).send({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}
function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).send({ message: "User logged out successfully" });
}

//! foodPartener Auth Controller's

async function registerFoodPartener(req, res) {
  const { bussinessname, contactname, phone, bussinessemail, password, address } = req.body;
  const isFoodPartenerAlreadyExists = await foodPartenerModel.findOne({
    bussinessemail,
  });

  if (isFoodPartenerAlreadyExists) {
    return res.status(400).send("Food Partener already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const foodPartener = await foodPartenerModel.create({
    bussinessname,
    contactname,
    phone,
    bussinessemail,
    password: hashedPassword,
    address,
  });

  const token = jwt.sign(
    {
      id: foodPartener._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).send({
    message: "Food Partener registered successfully",
    foodPartener: {
      _id: foodPartener._id,
      bussinessname: foodPartener.bussinessname,
      contactname: foodPartener.contactname,
      phone: foodPartener.phone,
      bussinessemail: foodPartener.bussinessemail,
      address: foodPartener.address,
    },
  });
}

async function loginFoodPartener(req, res) {
  const { bussinessemail, password } = req.body;
  const foodPartener = await foodPartenerModel.findOne({
    bussinessemail,
  });

  if (!foodPartener) {
    return res.status(400).send("Invalid email or password");
  }

  const isPassValid = await bcrypt.compare(password, foodPartener.password);
  if (!isPassValid) {
    return res.status(400).send("Invalid email or password");
  }
  const token = jwt.sign(
    {
      id: foodPartener._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token);
  res.status(200).send({
    message: "Food Partener logged in successfully",
    foodPartener: {
      _id: foodPartener._id,
      bussinessname: foodPartener.bussinessname,
      contactname: foodPartener.contactname,
      phone: foodPartener.phone,
      bussinessemail: foodPartener.bussinessemail,
      address: foodPartener.address,
    },
  });
}

function logoutFoodPartener(req, res) {
  res.clearCookie("token");
  res.status(200).send({ message: "Food Partener logged out successfully" });
}
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartener,
  loginFoodPartener,
  logoutFoodPartener,
};
