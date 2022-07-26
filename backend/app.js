//-----------------------------------------Requirements----------------------------------------------------//
const express = require("express");
const dotenv = require("dotenv");
const connect = require("./config/dbConfig");
const userRouter = require("./routes/user.router");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
//----------------------------------------Coding Part--------------------------------------------------------//

app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
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
