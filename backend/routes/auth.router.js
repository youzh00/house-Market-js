const express = require("express");
const router = new express.Router();
const {RegisterUser}=require('../controllers/register.controller')
const {LoginUser}=require('../controllers/login.controller')
const {LogoutUser}=require('../controllers/logout.controller')
const {isConnected2} = require("../middlewares/auth2.middleware");



router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/logout").post(isConnected2,LogoutUser);


module.exports = router;
