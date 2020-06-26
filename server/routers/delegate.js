var express = require('express');
var router = express.Router();
const sql = require('mssql');

const poolConnect = require('../db-conn-mssql');
const connection = require('../db-conn');


const GetPersonalDrafts = (req, res) => {
  console.log(req.query);
  const { username } = req.query;

  poolConnect
    .then((pool) => {
      pool.request()
        .input('Username', sql.VarChar(50), username)
        .execute('GetPersonalDrafts', (err, proc_res) => {
          if (err) {
            console.log(err);
            res.status(501).send("Internal database error");
            return;
          }
          res.status(200).send(proc_res.recordset);
          console.dir(proc_res);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(501).send("Internal database error");
    });
}

const GetDelegableMatches = (req, res) => {
  console.log(req.query);
  const { username } = req.query;

  poolConnect
    .then((pool) => {
      pool.request()
        .input('Username', sql.VarChar(50), username)
        .execute('GetPersonalDelegableMatches', (err, proc_res) => {
          if (err) {
            console.log(err);
            res.status(501).send("Internal database error");
            return;
          }
          res.status(200).send(proc_res.recordset);
          console.dir(proc_res);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(501).send("Internal database error");
    });
}

const GetEligibleRefsForDelegableMatches = (req, res) => {
  console.log(req.query);
  const { username } = req.query;

  poolConnect
    .then((pool) => {
      pool.request()
        .input('Username', sql.VarChar(50), username)
        .execute('EligibleRefsForDelegableMatches', (err, proc_res) => {
          if (err) {
            console.log(err);
            res.status(501).send("Internal database error");
            return;
          }
          res.status(200).send(proc_res.recordset);
          console.dir(proc_res);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(501).send("Internal database error");
    });
}

const GetPersonalRejectedDrafts = (req, res) => {
  console.log(req.query);
  const { username } = req.query;

  poolConnect
    .then((pool) => {
      pool.request()
        .input('Username', sql.VarChar(50), username)
        .execute('GetPersonalRejectedDrafts', (err, proc_res) => {
          if (err) {
            console.log(err);
            res.status(501).send("Internal database error");
            return;
          }
          res.status(200).send(proc_res.recordset);
          console.dir(proc_res);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(501).send("Internal database error");
    });
}

const GetPersonalProposedDrafts = (req, res) => {
  console.log(req.query);
  const { username } = req.query;

  poolConnect
    .then((pool) => {
      pool.request()
        .input('Username', sql.VarChar(50), username)
        .execute('GetPersonalProposedDrafts', (err, proc_res) => {
          if (err) {
            console.log(err);
            res.status(501).send("Internal database error");
            return;
          }
          res.status(200).send(proc_res.recordset);
          console.dir(proc_res);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(501).send("Internal database error");
    });
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