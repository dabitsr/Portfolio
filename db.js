const mongoose = require("mongoose");
require("dotenv/config");

const db = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err}`);
    process.exit(1);
  }
};

module.exports = db;
