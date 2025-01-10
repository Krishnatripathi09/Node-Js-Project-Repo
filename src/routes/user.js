const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "gender"]);

    res.json({
      message: "Data Fetched SuccessFully",
      data: connectionRequests,
    });
  } catch (err) {
    req.statusCode(400).send("ERROR" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", ["firstName", "lastName"]);

    const data = connectionRequests.map((row) => row.fromUserId);

    res.json({
      message: "Connections fetched Successfully",
      data,
    });
  } catch (err) {
    req.statusCode(400).send("ERROR" + err.message);
  }
});

module.exports = userRouter;
