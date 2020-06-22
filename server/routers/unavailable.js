var express = require('express');
var router = express.Router();

const connection = require('../db-conn');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

const AddUnavailabilityPeriod = (req, res) => {
  var query = "[dbo].[AddUnavailabilityPeriod] @Username, @Reason, @StartDate, @EndDate";
  const { username, reason, startdate, enddate } = req.body;

  const request = new Request(query, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.status(200).send("Success!");
    }
  });
  request.addParameter('Username', TYPES.VarChar, username);
  request.addParameter('Reason', TYPES.NVarChar, reason);
  request.addParameter('StartDate', TYPES.Date, startdate);
  request.addParameter('EndDate', TYPES.Date, enddate);

  connection.execSql(request);
}

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
  request.addParameter('Username', TYPES.VarChar, username);

  request.on("row", (cols) => {
    let obj = {};
    cols.forEach((col) => {
      obj[col.metadata.colName] = col.value;
    });
    periods.push(obj);
  });

  connection.execSql(request);
}

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
  request.addParameter('Username', TYPES.VarChar, username);

  request.on("row", (cols) => {
    let obj = {};
    cols.forEach((col) => {
      obj[col.metadata.colName] = col.value;
    });
    periods.push(obj);
  });

  connection.execSql(request);
}

router.post('/', AddUnavailabilityPeriod);

router.get('/personal/upcoming', GetUpcomingPeriodsPersonal);

router.get('/personal/old', GetOldPeriodsPersonal);


module.exports = router;

