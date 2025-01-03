const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there
const { adminAuth } = require("./middlewares/auth");
const app = express();

//Handle Auth MiddleWare for all GET,POST,....Requests
app.use("/admin", adminAuth);

app.get("/User", (req, res) => {
  res.send("Welcome to User Page");
});

app.get("/admin/getData", (req, res) => {
  res.send("Welcome to Admin Page Be...");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
