const express = require("express");
const router = new express.Router();
const {isConnected2:isConnected} = require("../middlewares/auth2.middleware");
const {
  createHouse,
  getAllUserHouses,
  getHouseById,
  updateHouse,
  deleteHouse,
  addHousePicturesById,
  getAllHouses,
} = require("../controllers/house.controller");
const uploadUserPic = require("../middlewares/uploadUserPic.middleware");
const uploadHousePics = require("../middlewares/uploadHousePics.middleware");

//!--------------------------------Routes----------------------------------//
router.route("/").post(isConnected, createHouse).get(getAllHouses);

router.route("/me").get(isConnected, getAllUserHouses);

router
  .route("/:id")
  .get(isConnected, getHouseById)
  .put(isConnected, updateHouse)
  .delete(isConnected, deleteHouse);

router
  .route("/:id/pics")
  .post(
    isConnected,
    uploadHousePics.any("image"),
    addHousePicturesById,
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    }
  );

module.exports = router;
