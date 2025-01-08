const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //Sending a Connection Request
  console.log("sending Connnection Request ");

  res.send("Connection Request Sent");
});

module.exports = requestRouter;
