const post = require("../model/postSchema");
const user = require("../model/userSchema");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const createpost = async (req, res) => {
  const { userid, description, picturepath } = req.body;

  const curuser = await user.findById(userid); //findById(id
  const newpost = new post({
    userid,
    firstname: curuser.firstname,
    lastname: curuser.lastname,
    location: curuser.location,
    description,
    userpicturepath: curuser.picturepath,
    picturepath,
    likes: {},
    comments: [],
  });
  await newpost.save();

  const posts = await post.find();

  res.status(StatusCodes.CREATED).json(posts.reverse());
};

const getfeedposts = async (req, res) => {
  const posts = await post.find();
  res.status(StatusCodes.OK).json(posts.reverse());
};

const getuserposts = async (req, res) => {
  const { userid } = req.params;
  const userpost = await post.find({ userid });

  res.status(StatusCodes.OK).json(userpost.reverse());
};

const likepost = async (req, res) => {
  const { id } = req.params;
  const { userid } = req.body;
  const userpost = await post.findById(id); //mongodb id of post
  const isLiked = userpost.likes.get(userid); // In likes array checkking,if user liked it or not

  if (isLiked) {
    userpost.likes.delete(userid);
  } else {
    userpost.likes.set(userid, true);
  }

  const updatedPost = await post.findByIdAndUpdate(
    id, //mongodb id of post
    { likes: userpost.likes },
    { new: true }
  );

  res.status(StatusCodes.OK).json(updatedPost);
};

const commentpost = async (req, res) => {
  const { id } = req.params;
  const { userid, comment } = req.body;
  // const commentId = new mongoose.Types.ObjectId(userid);
  const commenteduser = await user.findById(userid);
  const commentUserpath = commenteduser.picturepath;
  const commentUsername = commenteduser.firstname;
  const postuser = await post.findById(id);
  const arr = [];
  arr.push(commentUsername);
  arr.push(comment);
  arr.push(commentUserpath);
  postuser.comments.unshift(arr);
  const userpost = await post.findByIdAndUpdate(
    { _id: id },
    {
      comments: postuser.comments,
    },
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json(userpost);
};

module.exports = {
  createpost,
  getfeedposts,
  getuserposts,
  likepost,
  commentpost,

};
