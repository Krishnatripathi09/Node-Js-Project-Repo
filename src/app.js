const connectDB = require("./config/database");
const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Elon",
    lastName: "Musk",
    emailId: "Elon@789.com",
    password: "Elon@678",
  };

  const user = new User(userObj); // Creating the new instance of the Model User by passing the data of that Model
  await user.save();
  res.send("User Created in DataBase :)");
});

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
