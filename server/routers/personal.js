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
          /* Only one personal Info */
          res.status(200).send(proc_res.recordset[0]);
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
    return;
  }

  poolConnect
    .then((pool) => {
      pool
        .request()
        .input("Username", sql.VarChar(50), username)
        .input("FirstName", sql.VarChar(30), firstName)
        .input("LastName", sql.VarChar(30), lastName)
        .input("Address", sql.VarChar(50), username)
        .input("Email", sql.VarChar(50), email)
        .input("PhoneNumber", sql.VarChar(10), mobilePhone)
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
    return;
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
