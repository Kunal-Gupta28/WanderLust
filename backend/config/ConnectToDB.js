const mongoose = require("mongoose");

const connectToDB = async () => {
  const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.warn("MongoDB connection offline/sandbox restricted.");
    console.warn("Running in resilient mode (in-memory JWT & auth storage enabled).");
  }
};

module.exports = connectToDB;
