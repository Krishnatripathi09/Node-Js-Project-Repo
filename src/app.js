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
