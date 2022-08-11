const HouseModel = require("../models/house.model");
const sharp = require("sharp");

//create a new house
//private:to connected users
//path:/houses
const createHouse = async (req, res) => {
  try {
    const house = new HouseModel({
      ...req.body,
      author: req.user._id,
      pictures: ["images/sample.jpg"],
    });
    await house.save();
    res.send(house);
    console.log("house saved successfully");
  } catch (error) {
    res.status(400);
    throw new Error("Invalid User Data");
  }
};

//get User Houses  from database using queries
//Private: For connected user
//path:
//    /houses?forRent=true
//    /houses?forSale=true
//    /houses?city=marrakech
//    /houses?limit=10&skip=0
//    /houses?sortBy=createdAt:desc
const getAllUserHouses = async (req, res) => {
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

//get houses from database by id
//private:to connected users
//path:/houses/:id
const getHouseById = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  try {
    const house = await HouseModel.findOne({ _id, author: req.user._id });
    console.log(house);
    if (!house) {
      return res.status(404).send({ message: "Property not found" });
    }
    res.status(200).send(house);
  } catch (error) {
    res.status(500);
    throw new Error(`Error: ${error}`);
  }
};

//update house data
//private:to connected users
//path:/houses/:id
const updateHouse = async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "description",
    "city",
    "country",
    "price",
    "forRent",
    "forSale",
    "propertyType",
  ];
  const isValidOper = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOper) {
    return res.status(400).send({ message: "Inavalid update data" });
  }
  try {
    const house = await HouseModel.findOne({ _id, author: req.user._id });
    if (!house) {
      return res.status(404).send({ message: "Property not found" });
    }
    updates.forEach((update) => (house[update] = req.body[update]));
    await house.save();
    res.status(200).send(house);
  } catch (error) {
    res.status(500).send();
    throw new Error(`Error: ${error}`);
  }
};
//delete house from database
//private:to connected users
//path:/houses/:id
const deleteHouse = async (req, res) => {
  const _id = req.params.id;
  try {
    const house = await HouseModel.findOne({ _id, author: req.user._id });
    if (!house) {
      return res.status(404).send({ message: "Property not found" });
    }
    await house.delete();
    res.status(200).send({ message: "Property deleted" });
  } catch (error) {
    res.status(500).send();
    throw new Error(`Error: ${error}`);
  }
};
//add house  pictures
//path: /houses/pics
// private : to connected users
const addHousePicturesById = async (req, res) => {
  const files = req.files;
  const _id = req.params.id;
  if (!files) {
    return res.status(400).send({ message: "Please choose pictures" });
  }
  const fileCount = files.length;
  if (fileCount > 5) {
    return res.status(400).send({
      message: "You have the right only to upload 5 images in maximum",
    });
  }
  try {
    const house = await HouseModel.findOne({ _id, author: req.user._id });
    if (!house) {
      return res.status(404).send({ message: "Property not found" });
    }
    let images = [];
    house.pictures = [];
    files.forEach(async (file) => {
      images.push(`${file.destination}${file.filename}`);
    });
    house.pictures = images;
    await house.save();
    res.status(200).send(house);
  } catch (error) {
    res.send(500);
    throw new Error("Cannot add House Pictures");
  }
};

//get Houses  from database using queries
//Public: For All User
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
  const limit = req.query.limit ? req.query.limit : 0;
  const skip = req.query.skip ? req.query.skip : 0;
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  console.log("match :", match);

  try {
    const houses = await HouseModel.find(match)
      .limit(limit)
      .skip(skip)
      .sort(sort.createdAt);
    if (!houses) {
      return res.status(404).send({ message: "House not found" });
    }
    return res.status(200).send(houses);
  } catch (error) {
    res.status(500);
    throw new Error(`Error: ${error}`);
  }
};
//-------------------------------------------- Exports-------------------------------------------//
module.exports = {
  createHouse,
  getHouseById,
  getAllUserHouses,
  updateHouse,
  deleteHouse,
  addHousePicturesById,
  getAllHouses,
};
