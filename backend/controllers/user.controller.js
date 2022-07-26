const UserModel = require("../models/user.model");

//sign up an user to database
//path: /users
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

module.exports = {
  createUserAccount,
};
