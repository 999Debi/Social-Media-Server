const { getfeedposts, getuserposts, likepost,commentpost } = require("../controler/posts");
const express=require('express');
const verifytoken = require('../middleware/auth');
const router=express.Router();

router.get('/',verifytoken,getfeedposts);
router.get("/:userid/post", verifytoken, getuserposts);

router.patch("/:id/like", verifytoken, likepost).patch("/:id/comment",verifytoken,commentpost)

module.exports=router;