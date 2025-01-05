const connectDB = require("./config/database");
const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there
const app = express();
const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  // Creating the new instance of the  User Model by passing the data of that Model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Created in DataBase :)");
  } catch (err) {
    res.status(400).send("Error Saving the User Info :(" + err.message);
  }
});

//Get User by email

app.get("/user", async (req, res) => {
  const userName = req.body._id;

  const user = await User.findOne({ _id: userName });
  res.send(user);
  // try {
  //   const user = await User.find({ email: userEmail });
  //   if (user.length === 0) {
  //     res.status(404).send("User Not Found");
  //   } else {
  //     res.send(user);
  //   }
  // } catch (err) {
  //   res.status(400).send("Something Went Wrong :(");
  // }
});

//Feed API - GET /feed - get all the users from the DataBase
app.get("/getData", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Na milal Be");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Delted Successfully Bhau !");
  } catch (err) {
    res.status(400).send("Error Deleting User Info :(" + err.message);
  }
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
