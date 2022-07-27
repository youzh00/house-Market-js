//!--------------Requirements--------------//
const express = require("express");
const router = new express.Router();
const {
  createUserAccount,
  loginUser,
  getUserById,
  logOutUser,
  deleteUserAccount,
  updateUserProfile,
  logoutFromAllSessions,
  addProfilePicture,
} = require("../controllers/user.controller");
const isConnected = require("../middlewares/auth.middleware");
const uploadUserPic = require("../middlewares/uploadUserPic.middleware");
//!--------------Coding--------------------//

router.route("/register").post(createUserAccount);

router.route("/login").post(loginUser);

router.route("/logout").post(isConnected, logOutUser);
router.route("/logoutAll").post(isConnected, logoutFromAllSessions);

router.route("/:id").get(getUserById);

router
  .route("/me")
  .delete(isConnected, deleteUserAccount)
  .put(isConnected, updateUserProfile);

router
  .route("/me/avatar")
  .post(
    isConnected,
    uploadUserPic.single("avatar"),
    addProfilePicture,
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    }
  );

module.exports = router;
