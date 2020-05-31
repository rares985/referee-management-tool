require("dotenv").config({
  path: __dirname + "./env",
});

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const withAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).send("Unauthorized: No token was provided");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token provided");
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};

module.exports = withAuth;
