const mongoose = require("mongoose");
const connectDB = async () => {
  const url = process.env.MONGO_URI;
  try {
    await mongoose.connect(url);
    console.log("Connected to database...".cyan.underline);
  } catch (error) {
    console.log("Error: ", error.message);
    process.exit();
  }
};

module.exports = connectDB;
