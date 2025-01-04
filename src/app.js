const connectDB = require("./config/database");
const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there

const app = express();

connectDB()
  .then(() => {
    console.log("connected to database :)");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection Failed:", err);
  });
