const UserModel = require("../models/user.model");

//sign up an user to database
//path: /users/register
// public
const createUserAccount = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
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
    res.status(200).send({ user });
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

module.exports = {
  createUserAccount,
  loginUser,
  getUserById,
};
