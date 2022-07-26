//!--------------Requirements--------------//
const express = require("express");
const router = new express.Router();
const {
  createUserAccount,
  loginUser,
  getUserById,
  logOutUser,
} = require("../controllers/user.controller");
const isConnected = require("../middlewares/auth.middleware");
//!--------------Coding--------------------//

console.log(isConnected);
console.log(logOutUser);

router.route("/register").post(createUserAccount);

router.route("/login").post(loginUser);

router.route("/logout").post(isConnected, logOutUser);

router.route("/:id").get(getUserById);

module.exports = router;
