//!--------------Requirements--------------//
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

//!--------------Coding--------------------//

const isConnected = async (req, res, next) => {
  console.log("In the auth middleware");
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.Secret_Key);

    const user = await UserModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error("Unable to find user");

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = isConnected;
