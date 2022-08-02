const express = require("express");
const router = new express.Router();
const isConnected = require("../middlewares/auth.middleware");
const { createHouse } = require("../controllers/house.controller");
//!--------------------------------Routes----------------------------------//
router.route("/").post(isConnected, createHouse);

module.exports = router;
