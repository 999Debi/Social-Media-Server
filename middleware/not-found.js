const notFoundMiddleware = (req, res) => {
  res.status(404).send("Route Does Not ");
};
module.exports = notFoundMiddleware;
