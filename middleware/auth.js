const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // get token from header
  const token = req.header("authentication-token");
  // check for token
  if (!token) {
    return res.status(401).json({ msg: "Authorization Denied" });
  }
  // verify user to send on the request object so we have access in the route
  try {
    const decodedUser = jwt.verify(token, config.get("jwtSecret"));
    console.log(decodedUser);
    req.user = decodedUser.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Authentication not valid" });
  }
};
