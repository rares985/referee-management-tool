var express = require("express");
var router = express.Router();

const connection = require("../db-conn");
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

const sql = require("mssql");
const poolConnect = require("../db-conn-mssql");

const AddUnavailabilityPeriod = (req, res) => {
  const { username, reason, startdate, enddate } = req.body;

  if (!username || !reason || !startdate || !enddate) {
    res.status(400).send("Invalid parameters!");
    return;
  }

  poolConnect
    .then((pool) => {
      pool
        .request()
        .input("Username", sql.VarChar(50), username)
        .input("Reason", sql.VarChar(50), reason)
        .input("StartDate", sql.VarChar(50), startdate)
        .input("EndDate", sql.VarChar(50), enddate)
        .execute("AddUnavailabilityPeriod", (err, proc_res) => {
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

const DeleteUpcomingPeriodsPersonal = (req, res) => {
  console.log(req.data);
  const { ids, username } = req.body;

  const query = `DELETE FROM unavailability_period WHERE id IN ${["(", ids.toString(), ")"].join(
    ""
  )}`;

  if (!ids || !username) {
    res.status(400).send("Invalid parameters");
    return;
  }

  poolConnect
    .then((pool) => {
      return pool.request().query(query);
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(501).send("Internal database error");
    });
};

const GetUpcomingPeriodsPersonal = (req, res) => {
  var query = "[dbo].[GetUpcomingUnavailabilityPeriodsPersonal] @Username";
  const { username } = req.query;

  let periods = [];

  const request = new Request(query, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.status(200).send(periods);
    }
  });
  request.addParameter("Username", TYPES.VarChar, username);

  request.on("row", (cols) => {
    let obj = {};
    cols.forEach((col) => {
      obj[col.metadata.colName] = col.value;
    });
    periods.push(obj);
  });

  connection.execSql(request);
};

const GetOldPeriodsPersonal = (req, res) => {
  var query = "[dbo].[GetUnavailabilityPeriodsOld] @Username";
  const { username } = req.query;

  let periods = [];

  const request = new Request(query, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.status(200).send(periods);
    }
  });
  request.addParameter("Username", TYPES.VarChar, username);

  request.on("row", (cols) => {
    let obj = {};
    cols.forEach((col) => {
      obj[col.metadata.colName] = col.value;
    });
    periods.push(obj);
  });

  connection.execSql(request);
};

router.post("/", AddUnavailabilityPeriod);

router.delete("/personal/upcoming", DeleteUpcomingPeriodsPersonal);

router.get("/personal/upcoming", GetUpcomingPeriodsPersonal);

router.get("/personal/old", GetOldPeriodsPersonal);

module.exports = router;
