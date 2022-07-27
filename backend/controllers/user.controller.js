const UserModel = require("../models/user.model");

//sign up an user to database
//path: /users/register
// public
const createUserAccount = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    const token = await user.creatAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid User Data");
  }
};

//get user by id from database
//path: /users/:id
// private : to admin
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(404);
    throw new Error("User not found");
  }
};

//Login an user
//path: /users/login
//public
const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.creatAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
};

//log out user
//path: /users/logout
// private : to connected users
const logOutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500);
    throw new Error("Unable to logout user");
  }
};

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
    res.status(500).send(`Error: ${error}`);
  }
};
module.exports = {
  createUserAccount,
  loginUser,
  getUserById,
  logOutUser,
  deleteUserAccount,
  updateUserProfile,
};
