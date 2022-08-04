const express = require("express");
const router = new express.Router();
const isConnected = require("../middlewares/auth.middleware");
const {
  createHouse,
  getAllHouses,
  getHouseById,
} = require("../controllers/house.controller");
//!--------------------------------Routes----------------------------------//
router.route("/").post(isConnected, createHouse).get(isConnected, getAllHouses);

router.route("/:id").get(isConnected, getHouseById);

module.exports = router;
