const express = require("express");
const router = new express.Router();
const {RegisterUser}=require('../controllers/register.controller')
const {LoginUser}=require('../controllers/login.controller')



router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);


module.exports = router;
