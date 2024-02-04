const verifytoken = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const {
  getuser,
  getuserfriend,
  sendFriend,
  makeFriend,
  unFriend,
  cancelFriend,
  cancelSentReq,
  getallrequestedFriend,
  getalreadyFriend,
  searchUser,
} = require("../controler/user");

router.get("/:id/allrequest", verifytoken, getallrequestedFriend);
router.get("/:userfriendid", verifytoken, getuser);
router.get("/:id/friends", verifytoken, getuserfriend);
router.get("/:id/alreadyfriends", verifytoken, getalreadyFriend);

router.post("/search", verifytoken, searchUser);
router
  .patch("/:id/:friendid/add", verifytoken, makeFriend)
  .patch("/:id/:friendid/cancel", verifytoken, cancelFriend)
  .patch("/:id/:friendid/cancelSentReq", verifytoken, cancelSentReq)
  .patch("/:id/:friendid/request", verifytoken, sendFriend)
  .patch("/:userid/:friendid/unfriend", verifytoken, unFriend);

module.exports = router;
