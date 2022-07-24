const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MongoDb_URL);
    console.log(`Connected to database at ${process.env.MongoDb_URL}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDb;
