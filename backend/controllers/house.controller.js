const HouseModel = require("../models/house.model");

//create a new house
//private:to connected users
//path:/houses
const createHouse = async (req, res) => {
  console.log("Out of createHouse try catch");

  try {
    console.log("Inside of createHouse try catch");
    const house = new HouseModel({
      ...req.body,
      author: req.user._id,
    });
    console.log(house);
    await house.save();
    res.send(house);
    console.log("house saved successfully");
  } catch (error) {
    res.status(400);
    throw new Error("Invalid User Data");
  }
};

//------------------------------------------- Exports-------------------------------------------//
module.exports = { createHouse };
