module.exports = function(io) {
  return function(req, res, next) {
    req.io = io;
    next();
  }
}