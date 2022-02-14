const jwt = require("jsonwebtoken");
const { UnauthError } = require("../errors");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw new UnauthError
  }
  const token = header.split(" ")[1];

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID, username: payload.username, permission: payload.permission };
    next();
  } catch (err) {
    throw new UnauthError
  }
};