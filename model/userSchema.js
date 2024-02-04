const mongoose=require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    lastname: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 30,
    },
    password: {
      type: String,
      require: true,
    },
    picturepath: {
      type: String,
      default: "DefaultProfile.png",
    },
    friends: {
      type: Array, // array of user friends_ids      
      default: [],
    },
    requestedFriend: {
      type: Array,
      default: [],
    },
    location: String,

    About: {
      type: Object,
      default: {
         Graduationyear: "" ,
         Specialization: "" ,
         Skills: "" ,
         Work:"",Clubs:"",Hobbies:""
      }
    },
  },
  { timestamps: true }
);
const user = mongoose.model("user", userSchema);
module
.exports=user;
