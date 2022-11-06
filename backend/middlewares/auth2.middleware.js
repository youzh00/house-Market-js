//!--------------Requirements--------------//
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

//!--------------Coding--------------------//

const isConnected2 = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

    const user = await UserModel.findOne({ _id: decoded._id,});
    
    if (!user) return res.sendStatus(403); ;

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden, You have to be connected" });
  }
};

module.exports = {isConnected2};
