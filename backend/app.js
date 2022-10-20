//-----------------------------------------Requirements----------------------------------------------------//
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

require("express-async-errors");
const connect = require("./config/dbConfig");
const cors = require("cors");
const userRouter = require("./routes/user.router");
const houseRouter = require("./routes/house.router");
const authRouter = require("./routes/auth.router");

const { notFound, errorHandler } = require("./middlewares/error.middleware");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
//----------------------------------------Coding Part--------------------------------------------------------//
app.use((req, res, next) => {
  res.header({"Access-Control-Allow-Origin": "*"});
  next();
}) 
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/houses", houseRouter);
app.use("/auth", authRouter);
app.use("/images", express.static(path.join(__dirname, "..", "/images")));
app.use(
  "/profilePictures",
  express.static(path.join(__dirname, "..", "/profilePictures"))
);
app.use(notFound);
app.use(errorHandler);
const start = async () => {
  try {
    console.log(
      "------------------Before Start--------------------------------"
    );

    await connect();
    app.listen(port, () => {
      console.log(`Application running on http://localhost:${port}/`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
