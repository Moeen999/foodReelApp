const mongoose = require("mongoose");

const foodPartenerSchema = new mongoose.Schema(
  {
    bussinessname: {
      type: String,
      required: true,
    },
    contactname:{
      type: String,
      required: true,
    },
    phone:{
      type:String,
      require:true
    },
    bussinessemail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

const foodPartenerModel = mongoose.model("foodpartener", foodPartenerSchema);

module.exports = foodPartenerModel;