var express = require("express");
var router = express.Router();

const sql = require("mssql");
const poolConnect = require("../db-conn-mssql");

const GetPublicMatches = (req, res) => {
  poolConnect
    .then((pool) => {
      pool.request().execute("GetPublicMatches", (err, proc_res) => {
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

router.get("/matches", GetPublicMatches);

module.exports = router;
