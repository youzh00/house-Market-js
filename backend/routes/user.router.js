//!--------------Requirements--------------//
const express = require("express");
const router = new express.Router();
const {
  // createUserAccount,
  // loginUser,
  getUserById,
  // logOutUser,
  deleteUserAccount,
  updateUserProfile,
  // logoutFromAllSessions,
  getUserProfilePicture,
  addProfilePicture,
  getUserProfile,
  deleteProfilePicture,
} = require("../controllers/user.controller");
const {isConnected2:isConnected} = require("../middlewares/auth2.middleware");
const uploadProfilePic = require("../middlewares/uploadUserPic.middleware");

//!----------------------Routes------------------------//

// router.route("/register").post(createUserAccount);

router
  .route("/me")
  .get(isConnected, getUserProfile)
  .delete(isConnected, deleteUserAccount)
  .put(isConnected, updateUserProfile);

// router.route("/login").post(loginUser);
// router.route("/logout").post(isConnected, logOutUser);
// router.route("/logoutAll").post(isConnected, logoutFromAllSessions);

router.route("/:id").get(getUserById);

router
  .route("/me/avatar")
  .post(
    isConnected,
    uploadProfilePic.single("avatar"),
    addProfilePicture,
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    }
  )
  .delete(isConnected, deleteProfilePicture);

router.route("/:id/avatar").get(getUserProfilePicture);
module.exports = router;
