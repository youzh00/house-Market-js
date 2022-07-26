const express = require("express");
const router = new express.Router();
const { createUserAccount } = require("../controllers/user.controller");

router.route("/register").post(createUserAccount);

module.exports = router;
