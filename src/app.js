const connectDB = require("./config/database");
const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  //validation of data
  try {
    validateSignUpData(req);

    const { firstName, lastName, email, password, gender } = req.body;
    //Encrypt The Password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    // Creating the new instance of the  User Model by passing the data of that Model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender,
    });

    await user.save();
    res.send("User Created in DataBase :)");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
//Sign-in API
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      res.send("Login Successfully");
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
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

//Feed API -Patch /feed- update the data of user with userID
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  console.log(data);
  try {
    await User.findByIdAndUpdate({ _id: userId }, data, { runValidator: true });
    res.send("User Updated Successfully!");
  } catch {
    res.status(400).send("Error Updating User Info :(");
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
