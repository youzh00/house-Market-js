const multer = require("multer");
const path = require("path");
const express = require("express");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "images/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploadHousePics = multer({
  storage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    console.log("In th Upload pictures middleware");
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error("Invalid file type"));
    }
    cb(undefined, true);
  },
});

module.exports = uploadHousePics;
