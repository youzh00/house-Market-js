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
    res.status(500).send(`Error: ${error}`);
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
    res.status(400).send(error);
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
    res.status(500).send(`Error: ${error}`);
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
    res.status(500).send({ error: error.message, user: req.user });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    await req.user.remove();
  } catch (error) {}
};

module.exports = {
  createUserAccount,
  loginUser,
  getUserById,
  logOutUser,
};
