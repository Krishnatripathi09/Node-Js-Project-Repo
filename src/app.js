const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/test", (req, res) => {
  res.send("Hello World");
});
app.use("/hi", (req, res) => {
  res.send("Hello Page ba");
});

app.use("/", (req, res) => {
  res.send("Namaste World");
});
