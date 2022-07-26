const UserModel = require("../models/user.model");

//sign up an user to database
//path: /users
// public
const createUserAccount = async (req, res) => {
  const { userName, password, email, age, bio, address, phoneNumber } =
    req.body;
  const user = await UserModel.create({
    userName,
    password,
    email,
    age,
    bio,
    address,
    phoneNumber,
  });
  if (!user) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    res.status(200).send({
      id: user._id,
      userName: user.userName,
      email: user.email,
      age: user.age,
      phoneNumber: user.phoneNumber,
      address: user.address,
      bio: user.bio,
    });
  }
};
