var express = require('express');
var router = express.Router();

const connection = require('../db-conn');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


const GetPersonalInfo = (req, res) => {
  var query = "[dbo].[GetPersonalInfo] @Username";
  console.log(req.query);
  const { username } = req.query;

  let info = {};

  const request = new Request(query, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.status(200).send(info);
    }
  });
  request.addParameter('Username', TYPES.VarChar, username);

  request.on("row", (cols) => {
    cols.forEach((col) => {
      info[col.metadata.colName] = col.value;
    });
  });

  connection.execSql(request);
}

const UpdatePersonalInfo = (req, res) => {
  const { username, address, firstName, lastName, mobilePhone, email } = req.body;
  console.log(
    `UPDATE_PERSONAL_INFO: Got request: ${username}, ${address}, ${firstName}, ${lastName}, ${mobilePhone}, ${email}`
  );

  if (
    username === undefined ||
    address === undefined ||
    firstName === undefined ||
    lastName === undefined ||
    mobilePhone === undefined ||
    email === undefined
  ) {
    res.status(401).send("Invalid parameters!");
  } else {
    var query = `[dbo].[UpdatePersonalInfo] @Username, 
      @FirstName,
      @LastName,
      @Address,
      @Email,
      @PhoneNumber`;

    request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err);
        res.status(400).send("User information not in database!");
      } else {
        res.status(200).send("Success!");
      }
    });
    request.addParameter('Username', TYPES.VarChar, username);
    request.addParameter('FirstName', TYPES.VarChar, firstName);
    request.addParameter('LastName', TYPES.VarChar, lastName);
    request.addParameter('Address', TYPES.VarChar, address);
    request.addParameter('Email', TYPES.VarChar, email);
    request.addParameter('PhoneNumber', TYPES.VarChar, mobilePhone);

    connection.execSql(request);
  }
}

/* Matches to which I can delegate */
router.get('/', GetPersonalInfo);
router.post('/', UpdatePersonalInfo);


module.exports = router;