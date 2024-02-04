const jwt=require('jsonwebtoken');
const {UnAuthenticatedError } =require('../error/index')

const verifytoken=async (req,res,next)=>{
    try {
        let token=req.header("Authorization");
        if(!token){
            throw new UnAuthenticatedError("Authentication invalid");
        }
        if (!token.startsWith("Bearer ")){
            throw new UnAuthenticatedError("Authentication invalid");
        }
          if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
          }
       const verified=jwt.verify(token,process.env.JWT_SECRET);
       req.user=verified;
       next();
    } catch (error) {
        throw new UnAuthenticatedError("Authentication invalid");
    }
}
module.exports=verifytoken;