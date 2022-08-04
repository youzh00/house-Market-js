const HouseModel = require("../models/house.model");

//create a new house
//private:to connected users
//path:/houses
const createHouse = async (req, res) => {
  try {
    const house = new HouseModel({
      ...req.body,
      author: req.user._id,
    });
    await house.save();
    res.send(house);
    console.log("house saved successfully");
  } catch (error) {
    res.status(400);
    throw new Error("Invalid User Data");
  }
};

//get tasks from database using queries
//public: For everyone
//path:
//    /houses?forRent=true
//    /houses?forSale=true
//    /houses?city=marrakech
//    /houses?limit=10&skip=0
//    /houses?sortBy=createdAt:desc
const getAllHouses = async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.forRent) {
    match.forRent = req.query.forRent === "true";
  }
  if (req.query.forSale) {
    match.forSale = req.query.forSale === "true";
  }
  if (req.query.city) {
    match.city = req.query.city;
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    await req.user.populate({
      path: "houses",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    const houses = req.user.houses;
    if (houses.length === 0) {
      return res.status(404).send();
    }
    res.status(200).send(houses);
  } catch (error) {
    res.status(500);
    throw new Error(`Error: ${error}`);
  }
};
//-------------------------------------------- Exports-------------------------------------------//
module.exports = { createHouse, getAllHouses };
