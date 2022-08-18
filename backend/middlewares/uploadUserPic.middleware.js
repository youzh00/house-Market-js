const multer = require("multer");
const path = require("path");
const express = require("express");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "profilePictures/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploadProfilePic = multer({
  storage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error("Invalid file type"));
    }
    cb(undefined, true);
  },
});

module.exports = uploadProfilePic;

// const multer = require("multer");

// const uploadUserPic = multer({
//   limits: { fileSize: 2000000 },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
//       return cb(new Error("Invalid file type"));
//     }
//     cb(undefined, true);
//   },
// });

// module.exports = uploadUserPic;
