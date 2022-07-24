const express = require("express");
const dotenv = require("dotenv");
const connect = require("./config/dbConfig");

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

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
