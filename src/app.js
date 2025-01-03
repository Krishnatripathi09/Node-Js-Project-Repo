const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// This will only listen to GET call on port 3000
app.get("/ab?c", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Krishna", lastName: "Tripathi" });
}); //make path optional using (?)
app.get("/a*e", (req, res) => {
  res.send({ firstName: "K", lastName: "Tripathi" });
}); // add wild card character (*) to match anything between the a and e

app.get("/ab+c", (req, res) => {
  res.send({ firstName: "Trishna", lastName: "Tripathi" });
}); //add the (+) operator to use any number of that character in path here we insert as many b as we want in path

app.get("/a(bcd)?e", (req, res) => {
  res.send({ firstName: "Trishna", lastName: "Tripathi" });
}); // here we have used parenthesis to make many letter in path optional by adding (?) in path

app.get("/users/:userId", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "YTU", lastName: "Tripathi" });
});

//Post the data to Server
app.post("/user", (req, res) => {
  res.send("Data saved succcessfully to server");
});

app.delete("/user", (req, res) => {
  res.send("User deleted successfully");
});

app.put("/user", (req, res) => {
  res.send("All user data updated successfully");
});

app.patch("/users", (req, res) => {
  res.send("User Updated Successfully");
});
