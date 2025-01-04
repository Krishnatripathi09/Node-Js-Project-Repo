const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there
require("./config/database");
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
