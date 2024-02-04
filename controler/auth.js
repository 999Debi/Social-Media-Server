const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const user = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnAuthenticatedError } = require("../error/index");

const Register = async (req, res) => {
  const { firstname, lastname, email, password, Graduationyear, Stream } =
    req.body;

  const userAlreadyExists = await user.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  const about = {
    Graduationyear: "",
    Specialization: "",
    Skills: "",
    Work: "",
    Clubs: "",
    Hobbies: "",
  };

  const newuser = new user({
    ...req.body,
    password: hashedpassword,
    About: { ...about, Graduationyear, Stream },
  });
  const saveduser = await newuser.save();
  res.status(StatusCodes.CREATED).json({ saveduser });
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  const loggedinuser = await user.findOne({ email: email });

  if (!loggedinuser) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const isMatch = await bcrypt.compare(
    password.toString(),
    loggedinuser.password
  );

  if (!isMatch) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = jwt.sign({ id: loggedinuser._id }, process.env.JWT_SECRET);

  res.status(StatusCodes.OK).json({ token, loggedinuser });
};

const updateUser = async (req, res) => {
  const { id, about, picturepath } = req.body;

  const User = await user.findOne({ _id: id });

 

  User.picturepath = picturepath;

  User.About = { ...about };

  await User.save();

  res.status(StatusCodes.OK).json({msg:"Profile Updated"});
};

module.exports = {
  Login,
  Register,
  updateUser,
};
