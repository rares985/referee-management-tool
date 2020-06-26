var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const connection = require('../db-conn');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

/* JWT secret */
const secret = process.env.JWT_SECRET;


/* AUTHENTICATE route */
router.post("/", (req, res) => {
  const { username, password } = req.body;
  console.log(`AUTH: Got request: ${username}, ${password}`);

  if (username === undefined || password === undefined) {
    res.status(401).send("Invalid parameters for authentication");
  } else {
    var query = `SELECT Password FROM [dbo].[User] WHERE Username='${username}'`;

    console.log(`Going to execute query ${query}`);
    request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err);
      } else {
        if (rowCount === 0) {
          res.status(401).send("Login failure!");
        }
        console.log(`Got ${rowCount} rows`);
      }
    });

    request.on("row", (cols) => {
      cols.forEach((col) => {
        if (col.value == null) {
          console.log("Got NULL value");
        } else {
          bcrypt.compare(password, col.value, (err, result) => {
            if (err) {
              throw err;
            } else {
              console.log(result);
              if (result) {
                console.log("Password Check OK. Issuing Token");
                const payload = { username };
                const token = jwt.sign(payload, secret, {
                  expiresIn: "1h",
                });
                res.cookie("token", token, { httpOnly: true }).sendStatus(200);
              } else {
                res.status(401).send("Login failure!");
              }
            }
          });
        }
      });
    });

    connection.execSql(request);
  }
});

/* Service routes for handling cookies & JWT tokens */
router.get("/checkToken", (req, res) => {
  res.sendStatus(200);
});

/* Logout , for deleting the cookie */
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
});


module.exports = router;