const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    forRent: {
      type: Boolean,
      required: true,
    },
    forSale: {
      type: Boolean,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    bedroom:{
      type: Number,
      default:0
    },
    bathroom:{
      type: Number,
      default:0
    },
    size:{
      type: Number,
      default:0
    },
    propertyType: {
      type: String,
      required: true,
    },
    pictures: [],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const House = mongoose.model("House", houseSchema);

module.exports = House;
