const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there
const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("I am first response");
    res.send("Hello from first response");
    next();
  },
  (req, res) => {
    console.log("I am second response");
    res.send("2nd Response");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
