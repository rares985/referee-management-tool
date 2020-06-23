var express = require('express');
var router = express.Router();

const connection = require('../db-conn');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


const GetPersonalDrafts = (req, res) => {
  var query = "[dbo].[GetPersonalDrafts] @Username";
  console.log(req.query);
  const { username } = req.query;

  let drafts = [];

  const request = new Request(query, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.status(200).send(drafts);
    }
  });
  request.addParameter('Username', TYPES.VarChar, username);

  request.on("row", (cols) => {
    let obj = {};
    cols.forEach((col) => {
      obj[col.metadata.colName] = col.value;
    });
    drafts.push(obj);
  });

  connection.execSql(request);
}

const GetDelegableMatches = (req, res) => {
  const username = req.query.username;
  console.log(`GET_DELEGABLE_MATCHES: Got request: ${username}`);

  let matches = [];

  const request = new Request(query, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(matches);
    }
  });
  request.addParameter('Username', TYPES.VarChar, username);

  request.on("row", (cols) => {
    let obj = {};
    cols.forEach((col) => {
      obj[col.metadata.colName] = col.value;
    });
    matches.push(obj);
  });

  connection.execSql(request);
}

const GetEligibleRefsForDelegableMatches = (req, res) => {
  const username = req.query.username;
  console.log(`ELIGIBLE_FOR_DELEGATION_PER_MATCHID: Got request ${username}`);

  if (username === undefined) {
    res.status(400).send("Invalid parameters");
  } else {
    var query = `[dbo].[EligibleRefsForDelegableMatches] ${username}`;

    let shortlist = [];
    var request = new Request(query, (err) => {
      if (err) {
        console.error(err);
        res.status(400).send("Failed to query the database!");
      } else {
        res.status(200).send(shortlist);
      }
    });

    request.on("row", (cols) => {
      let obj = {};
      cols.forEach((col) => {
        obj[col.metadata.colName] = col.value;
      });
      shortlist.push(obj);
    });

    connection.execSql(request);
  }
}

const GetPersonalRejectedDrafts = (req, res) => {
  const { username } = req.query;
  console.log(`GET_PERSONAL_REJECTED_DRAFTS: Got request ${username}`);

  if (username === undefined) {
    res.status(400).send("Invalid parameters");
  } else {
    var query = `[dbo].[GetPersonalRejectedDrafts] ${username}`;

    let shortlist = [];
    var request = new Request(query, (err) => {
      if (err) {
        console.error(err);
        res.status(400).send("Failed to query the database!");
      } else {
        res.status(200).send(shortlist);
      }
    });

    request.on("row", (cols) => {
      let obj = {};
      cols.forEach((col) => {
        obj[col.metadata.colName] = col.value;
      });
      shortlist.push(obj);
    });

    connection.execSql(request);
  }
}

const GetPersonalProposedDrafts = (req, res) => {
  const { username } = req.query;
  console.log(`GET_PERSONAL_PROPOSED_DRAFTS: Got request ${username}`);

  if (username === undefined) {
    res.status(400).send("Invalid parameters");
  } else {
    var query = `[dbo].[GetPersonalProposedDrafts] ${username}`;

    let shortlist = [];
    var request = new Request(query, (err) => {
      if (err) {
        console.error(err);
        res.status(400).send("Failed to query the database!");
      } else {
        res.status(200).send(shortlist);
      }
    });

    request.on("row", (cols) => {
      let obj = {};
      cols.forEach((col) => {
        obj[col.metadata.colName] = col.value;
      });
      shortlist.push(obj);
    });

    connection.execSql(request);
  }
}

/* Matches to which I can delegate */
router.get('/delegable/matches', GetDelegableMatches);
router.get('/delegable/shortlist', GetEligibleRefsForDelegableMatches);

/* My personal drafts - not yet proposed */
router.get('/drafts/matches', GetPersonalDrafts);
router.get('/drafts/shortlist', GetPersonalDrafts);

/* Drafts which I have proposed - not yet reviewed */
router.get('/proposed/matches', GetPersonalProposedDrafts);
router.get('/proposed/shortlist', GetPersonalDrafts);

/* Rejected drafts which need attention */
router.get('/rejected/matches', GetPersonalRejectedDrafts);
router.get('/rejected/shortlist', GetPersonalDrafts);

module.exports = router;