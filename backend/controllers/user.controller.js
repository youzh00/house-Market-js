const UserModel = require("../models/user.model");
const sharp = require("sharp");

//sign up an user to database
//path: /users/register
// public
// const createUserAccount = async (req, res) => {
//   const userBody = req.body;
//   userBody.avatar = "/profilePictures/sample.png";
//   try {
//     const user = new UserModel(userBody);
//     await user.save();
//     const token = await user.creatAuthToken();
//     res.status(201).send({ user, token });
//   } catch (error) {
//     res.status(400);
//     throw new Error("Invalid User Data");
//   }
// };

//get connected user profile from database
//path: /users/me
// private : to user only
const getUserProfile = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500);
    throw new Error("Cannot get connected user profile ");
  }
};

//get user by id from database
//path: /users/:id
// private : to admin
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: "User not found" });
    throw new Error("User not found");
  }
};

//Login an user
//path: /users/login
//public
// const loginUser = async (req, res) => {
//   try {
//     const user = await UserModel.findByCredentials(
//       req.body.email,
//       req.body.password
//     );
//     const token = await user.creatAuthToken();
//     res.status(200).send({ user, token });
//   } catch (error) {
//     res.status(401);
//     throw new Error("Invalid Email or Password");
//   }
// };

//log out user
//path: /users/logout
// private : to connected users
// const logOutUser = async (req, res) => {
//   console.log("User logged out");
//   try {
//     req.user.tokens = req.user.tokens.filter((token) => {
//       return token.token != req.token;
//     });
//     await req.user.save();
//     res.status(200).send();
//   } catch (error) {
//     res.status(500);
//     throw new Error("Unable to logout user");
//   }
// };

//logout from all the sesions
//path: /users/logoutAll
// private : to connected users
// const logoutFromAllSessions = async (req, res) => {
//   try {
//     req.user.tokens = [];
//     await req.user.save();
//     res.send("logout from all the sessions successfully");
//   } catch (error) {
//     req.status(500);
//     throw new Error("Couldn't log out from all sessions");
//   }
// };

//delete user from database
//path: /users/me
// private : to connected users
const deleteUserAccount = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(404);
    throw new Error("User not found");
  }
};

//update user's data
//path: /users/me
// private : to connected users
const updateUserProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "userName",
    "email",
    "password",
    "age",
    "bio",
    "phoneNumber",
    "address",
  ];
  const isValidOper = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOper) {
    res.status(400);
    throw new Error("Invalid Updates");
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500);
    throw new Error("Cannot Update User Profile");
  }
};
//add user profile picture
//path: /users/me/avatar
// private : to connected users
const addProfilePicture = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: "Please choose picture" });
  }
  try {
    req.user.avatar = `/profilePictures/${file.filename}`;
    await req.user.save();
    res.send("added successfully");
  } catch (error) {
    res.send(500);
    throw new Error("Cannot add picture to user profile");
  }
};
//add user profile picture
//path: /users/:id/avatar
// private : to connected users
const getUserProfilePicture = async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  try {
    if (!user || !user.avatar) {
      throw new Error("user or image not found");
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
//delete user profile picture  from database
//path: /users/me/avatar
// private : to connected users
const deleteProfilePicture = async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send("Deleted successfully");
  } catch (error) {
    res.status(500);
    throw new Error("Cannot delete profile picture ");
  }
};

//------------------------------------------- Exports-------------------------------------------//
module.exports = {
  // createUserAccount,
  // loginUser,
  getUserById,
  getUserProfile,
  // logOutUser,
  deleteUserAccount,
  updateUserProfile,
  // logoutFromAllSessions,
  addProfilePicture,
  getUserProfilePicture,
  deleteProfilePicture,
};
