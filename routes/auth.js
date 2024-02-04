
const {Login,updateUser}=require('../controler/auth');
const verifytoken = require("../middleware/auth");


const express=require('express');
const router=express.Router();



  router.post("/login", Login);
  router.patch("/updateUser",updateUser)


module.exports=router;

