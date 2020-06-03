const path = require('path');
require("dotenv").config({
  path: path.resolve(__dirname, '..', '.env')
});

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const withAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).send("Unauthorized: No token was provided");
  } else {
    console.log("Verifying token...");
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log("Token verification failed");
        res.status(401).send("Unauthorized: Invalid token provided");
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};

module.exports = withAuth;
