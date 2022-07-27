const multer = require("multer");

const uploadUserPic = multer({
  dest: "profilePics",
  limits: { fileSize: 2000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error("Invalid file type"));
    }
    cb(undefined, true);
  },
});

module.exports = uploadUserPic;
