const express = require("express");
const router = new express.Router();
const {RegisterUser}=require('../controllers/auth.controller')



router.route("/register").post(RegisterUser);


module.exports = router;
