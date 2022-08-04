const express = require("express");
const router = new express.Router();
const isConnected = require("../middlewares/auth.middleware");
const {
  createHouse,
  getAllHouses,
  getHouseById,
  updateHouse,
} = require("../controllers/house.controller");
//!--------------------------------Routes----------------------------------//
router.route("/").post(isConnected, createHouse).get(isConnected, getAllHouses);

router
  .route("/:id")
  .get(isConnected, getHouseById)
  .put(isConnected, updateHouse);

module.exports = router;
