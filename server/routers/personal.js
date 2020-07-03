var express = require("express");
var router = express.Router();

const sql = require("mssql");
const poolConnect = require("../db-conn-mssql");

const GetPersonalInfo = (req, res) => {
  const { username } = req.query;

  if (!username) {
    res.status(400).send("Invalid parameters");
  }

  poolConnect
    .then((pool) => {
      pool
        .request()
        .input("Username", sql.VarChar(50), username)
        .execute("GetPersonalInfo", (err, proc_res) => {
          if (err) {
            console.log(err);
            res.status(501).send("Internal database error");
            return;
          }
          res.status(200).send(proc_res.recordset);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).send("Internal database error");
    });
};

const UpdatePersonalInfo = (req, res) => {
  const { username, address, firstName, lastName, mobilePhone, email } = req.body;
  if (!username || !address || !firstName || !lastName || !mobilePhone || !email) {
    res.status(400).send("Invalid parameters");
  }

  poolConnect
    .then((pool) => {
      pool
        .request()
        .input("Username", sql.VarChar(50), username)
        .input("FirstName", sql.VarChar(30), username)
        .input("LastName", sql.VarChar(30), username)
        .input("Address", sql.VarChar(50), username)
        .input("Email", sql.VarChar(50), username)
        .input("PhoneNumber", sql.VarChar(10), username)
        .execute("UpdatePersonalInfo", (err, proc_res) => {
          if (err) {
            console.log(err);
            res.status(501).send("Internal database error");
            return;
          }
          res.status(200).send(proc_res.recordset);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).send("Internal database error");
    });
};

const GetPersonalHistory = (req, res) => {
  const { username } = req.query;

  if (!username) {
    res.status(400).send("Invalid parameters");
  }

  poolConnect
    .then((pool) => {
      pool
        .request()
        .input("Username", sql.VarChar(50), username)
        .execute("GetPersonalHistory", (err, proc_res) => {
          if (err) {
            console.log(err);
            res.status(501).send("Internal database error");
            return;
          }
          res.status(200).send(proc_res.recordset);
          console.dir(proc_res);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).send("Internal database error");
    });
};

/* Matches to which I can delegate */
router.get("/", GetPersonalInfo);
router.post("/", UpdatePersonalInfo);
router.get("/history", GetPersonalHistory);

module.exports = router;
