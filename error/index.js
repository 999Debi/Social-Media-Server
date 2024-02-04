const BadRequestError =require ('./BadRequest');

const  UnAuthenticatedError=require('./UnAuthenticated')
const NotFoundError = require("./not-found");

module.exports={BadRequestError,NotFoundError,UnAuthenticatedError}