const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// This will only listen to GET call on port 3000
app.get("/user", (req, res) => {
  res.send({ firstName: "Krishna", lastName: "Tripathi" });
});

//Post the data to Server
app.post("/user", (req, res) => {
  res.send("Data saved succcessfully to server");
});

app.delete("/user", (req, res) => {
  res.send("User deleted successfully");
});
