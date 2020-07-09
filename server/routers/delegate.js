var express = require("express");
var router = express.Router();
const sql = require("mssql");

const poolConnect = require("../db-conn-mssql");
const connection = require("../db-conn");

const GetPersonalDrafts = (req, res) => {
  console.log(req.query);
  const { username } = req.query;

  poolConnect
    .then((pool) => {
      pool
        .request()
        .input("Username", sql.VarChar(50), username)
        .execute("GetPersonalDrafts", (err, proc_res) => {
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

const GetDelegableMatches = (req, res) => {
  console.log(req.query);
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
        .execute("GetPersonalDelegableMatches", (err, proc_res) => {
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

const GetEligibleRefsForDelegableMatches = (req, res) => {
  const { username } = req.query;

  poolConnect
    .then((pool) => {
      pool
        .request()
        .input("Username", sql.VarChar(50), username)
        .execute("EligibleRefsForDelegableMatches", (err, proc_res) => {
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

const GetPersonalRejectedDrafts = (req, res) => {
  console.log(req.query);
  const { username } = req.query;

  poolConnect
    .then((pool) => {
      pool
        .request()
        .input("Username", sql.VarChar(50), username)
        .execute("GetPersonalRejectedDrafts", (err, proc_res) => {
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

const GetPersonalProposedDrafts = (req, res) => {
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
        .execute("GetPersonalProposedDrafts", (err, proc_res) => {
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

const GetEligibleRefsForPersonalDrafts = (req, res) => {
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
        .execute("GetEligibleRefsForPersonalDrafts", (err, proc_res) => {
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

const AddPersonalDraft = (req, res) => {
  const { username, firstRefereeId, secondRefereeId, observerId, matchId } = req.body;

  if (!username || !matchId) {
    res.status(400).send("Invalid parameters");
    return;
  }

  if (!firstRefereeId && !secondRefereeId && !observerId) {
    res.status(401).send("Creating empty draft...not allowed");
    return;
  }

  poolConnect
    .then((pool) => {
      pool
        .request()
        .input("Username", sql.VarChar(50), username)
        .input("FirstRefereeID", sql.Int, firstRefereeId)
        .input("SecondRefereeID", sql.Int, secondRefereeId)
        .input("ObserverID", sql.Int, observerId)
        .input("MatchID", sql.Int, matchId)
        .execute("AddDraft", (err, proc_res) => {
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

const DeletePersonalDrafts = (req, res) => {
  console.log(req.data);
  const { draftIds } = req.body;

  if (!draftIds || draftIds.length === 0) {
    res.status(400).send("Invalid parameters");
    return;
  }

  const query = `DELETE FROM delegation_draft WHERE id IN ${["(", draftIds.toString(), ")"].join(
    ""
  )}`;

  poolConnect
    .then((pool) => {
      return pool.request().query(query);
    })
    .then((result) => {
      console.log(result);
      return;
    })
    .catch((err) => {
      console.log(err);
      res.status(501).send("Internal database error");
    });
};

/* Matches to which I can delegate */
router.get("/delegable/matches", GetDelegableMatches);
router.get("/delegable/shortlist", GetEligibleRefsForDelegableMatches);

/* My personal drafts - not yet proposed */
router.get("/drafts/matches", GetPersonalDrafts);
router.post("/drafts/matches", AddPersonalDraft);
router.delete("/drafts/matches", DeletePersonalDrafts);
router.get("/drafts/shortlist", GetEligibleRefsForPersonalDrafts);

/* Drafts which I have proposed - not yet reviewed */
router.get("/proposed/matches", GetPersonalProposedDrafts);

/* Rejected drafts which need attention */
router.get("/rejected/matches", GetPersonalRejectedDrafts);
router.get("/rejected/shortlist", GetPersonalDrafts);

module.exports = router;
