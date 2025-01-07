const connectDB = require("./config/database");
const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");
app.use(cookieParser());
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
      //Create a JWT Token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$619", {
        expiresIn: "1d",
      });
      //Add the Token to Cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000),
      });
      res.send("Login Successfully");
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //Sending a Connection Request
  console.log("sending Connnection Request ");

  res.send("Connection Request Sent");
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
