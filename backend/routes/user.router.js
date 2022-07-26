const express = require("express");
const router = new express.Router();
const {
  createUserAccount,
  loginUser,
  getUserById,
} = require("../controllers/user.controller");

router.route("/register").post(createUserAccount);

router.route("/login").post(loginUser);

router.route("/:id").get(getUserById);

module.exports = router;
