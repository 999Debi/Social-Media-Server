const { StatusCodes } = require("http-status-codes");
const user = require("../model/userSchema");
const {mongoose}=require ('mongoose')

const getuser = async (req, res) => {
  const { userfriendid} = req.params;
  const  curuser = await user.findById(userfriendid);



  // res.status(StatusCodes.OK).json({masg:"hello"});
  res.status(StatusCodes.OK).json(curuser);
};

const getuserfriend = async (req, res) => {
  const { id } = req.params;
  const curuser = await user.findById(id);
  const friends = await Promise.all(
    curuser.friends.map((id) => user.findById(id))
  );

  const formattedfriend = friends.map(
    ({ _id, firstname, lastname, location, picturepath }) => {
      return { _id, firstname, lastname, location, picturepath };
    }
  );

  res.status(StatusCodes.OK).json(formattedfriend);
};


const sendFriend = async (req, res) => {
  const { id, friendid } = req.params;
  const {
    _id: userid,
    picturepath,
    firstname,
    lastname,
  } = await user.findById(id);
  const friend = await user.findById(friendid);
  const arr = [userid, picturepath, firstname, lastname];
  let isDuplicate = false;
  friend.requestedFriend.map((ele) => {
    if (ele[0] === userid && ele[1] === picturepath) {
      isDuplicate = true;
    }
  });
  if (!isDuplicate) {
    friend.requestedFriend.push(arr);
  }
  await friend.save();


  res.status(StatusCodes.OK).json(friend.requestedFriend);
};

const getallrequestedFriend = async (req, res) => {
  const { id } = req.params;
  const { requestedFriend } = await user.findById(id);

  res.status(StatusCodes.OK).json(requestedFriend);
  // res.status(StatusCodes.OK).json({ msg: "hello" });
};
const getalreadyFriend = async (req, res) => {
  const { id } = req.params;
  const { friends } = await user.findById(id);

  res.status(StatusCodes.OK).json(friends);
  // res.status(StatusCodes.OK).json({ msg: "hello" });
};

const makeFriend = async (req, res) => {
  const { id, friendid} = req.params;
  const curuser = await user.findById(id);
  const frienduser=await user.findById(friendid);
  const { requestedFriend, friends } = curuser;
  const {friends:friendFriend}=frienduser;
  
  friends.unshift( new mongoose.Types.ObjectId(friendid));
  friendFriend.unshift(new mongoose.Types.ObjectId(id));
  
   for (let i = 0; i < requestedFriend.length; i++) {
     if (requestedFriend[i][0].toString() === friendid) {
  requestedFriend.splice(i, 1);
  break;
     }
   }


  await curuser.save();
await frienduser.save();
  res.status(StatusCodes.ACCEPTED).json({requestedFriend,friends});
};

const cancelFriend = async (req, res) => {
  const { id, friendid } = req.params;
    const curuser = await user.findById(id);
  const { requestedFriend, friends } = curuser;
     for (let i = 0; i < requestedFriend.length; i++) {
       if (requestedFriend[i][0].toString() === friendid) {
         requestedFriend.splice(i, 1);
         break;
       }
     }

  await curuser.save();

  res.status(StatusCodes.OK).json(requestedFriend);
};


const unFriend = async (req, res) => {

    const {userid,friendid}=req.params;
      const curuser = await user.findById(userid);
      const frienduser = await user.findById(friendid);
        const { friends } = curuser;
        const {friends:friendFriend}=frienduser;
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].toString() === friendid) {
            friends.splice(i, 1);
            break;
          }
        }

         for (let i = 0; i < friendFriend.length; i++) {
           if (friendFriend[i].toString() === userid) {
             friendFriend.splice(i, 1);
             break;
           }
         }
        

  await curuser.save();
  await frienduser.save()
   res.status(StatusCodes.OK).json(curuser.friends);


};

const cancelSentReq=async(req,res)=>{
const { id, friendid } = req.params;
const frienduser = await user.findById(friendid);
const {requestedFriend}=frienduser;
     for (let i = 0; i < requestedFriend.length; i++) {
       if (requestedFriend[i][0].toString() === id) {
         requestedFriend.splice(i, 1);
         break;
       }
     }

       await frienduser.save();
res.status(StatusCodes.OK).json({ msg: "Canceled" });
}
const updatePic= async(req,res)=>{

  res.status(StatusCodes.OK).json({msg:"Profile Picture Updated"})
}

const searchUser=async(req,res)=>{
const {searchdata}=req.body;
const alluser = await user.find({
  $or: [
    { firstname: { $regex: searchdata } },
    { lastname: { $regex: searchdata } },
  ],
});

res.status(StatusCodes.OK).json(alluser);
}

module.exports = {
  getuser,
  getuserfriend,
  // addremovefriend,
  sendFriend,
getallrequestedFriend ,
getalreadyFriend,
  makeFriend,
  cancelFriend,
  updatePic,
  unFriend,
  cancelSentReq,
  searchUser
};
