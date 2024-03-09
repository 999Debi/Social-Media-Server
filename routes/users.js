
import verifytoken from "../middleware/auth.js";

import express from "express";
import { Router } from "express";
const router = Router();

import {
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
} from "../controler/user.js";

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

export default router;
