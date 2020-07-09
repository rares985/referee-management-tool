var express = require("express");
var router = express.Router();

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
          return;
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).send("Internal database error");
    });
};

const DeleteUpcomingPeriodsPersonal = (req, res) => {
  const { ids, username } = req.body;

  if (!ids || !username) {
    res.status(400).send("Invalid parameters");
    return;
  }

  const query = `DELETE FROM unavailability_period WHERE id IN ${["(", ids.toString(), ")"].join(
    ""
  )}`;

  poolConnect
    .then((pool) => {
      return pool.request().query(query);
    })
    .then((result) => {
      res.status(200).send(result.recordset);
      return;
    })
    .catch((err) => {
      console.log(err);
      res.status(501).send("Internal database error");
    });
};

const GetUpcomingPeriodsPersonal = (req, res) => {
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
        .execute("GetUpcomingUnavailabilityPeriodsPersonal", (err, proc_res) => {
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

const GetOldPeriodsPersonal = (req, res) => {
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
        .execute("GetUnavailabilityPeriodsOld", (err, proc_res) => {
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

router.post("/", AddUnavailabilityPeriod);

router.delete("/personal/upcoming", DeleteUpcomingPeriodsPersonal);

router.get("/personal/upcoming", GetUpcomingPeriodsPersonal);

router.get("/personal/old", GetOldPeriodsPersonal);

module.exports = router;
