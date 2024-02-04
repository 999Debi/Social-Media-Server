class CustomAPIError extends Error {
  constructor(meassage) {
    super(meassage);
  }
}
module.exports=CustomAPIError;
