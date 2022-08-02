//-----------------------------------------Requirements----------------------------------------------------//
const express = require("express");
const dotenv = require("dotenv");
const connect = require("./config/dbConfig");
const userRouter = require("./routes/user.router");
const houseRouter = require("./routes/house.router");
const { notFound, errorHandler } = require("./middlewares/error.middleware");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
//----------------------------------------Coding Part--------------------------------------------------------//

app.use(express.json());
app.use("/users", userRouter);
app.use("/houses", houseRouter);

app.get("/houses", (req, res) => {
  res.send("Hello World!");
});

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
