const mongoose = require("mongoose");
const env = require("../envconfig");

const connectToDatabase = async () => {
  try {
    const connectionUri = env.DB_URL;
    await mongoose.connect(connectionUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: {
        w: "majority",
        wtimeout: 5000,
      },
    });

    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

module.exports = { connectToDatabase };
