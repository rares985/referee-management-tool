var express = require('express');
var router = express.Router();
const sql = require('mssql');

const poolConnect = require('../db-conn-mssql');
const connection = require('../db-conn');


const GetApprovableDrafts = (req, res) => {
  console.log(req.query);
  const { username } = req.query;

  poolConnect
    .then((pool) => {
      pool.request()
        .input('Username', sql.VarChar(50), username)
        .execute('GetApprovableDrafts', (err, proc_res) => {
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

const PostApprovedDrafts = (req, res) => {
  res.status(200).send("OK");
}

const PostRejectedDrafts = (req, res) => {
  res.status(200).send("OK");
}


router.get('/drafts/proposed', GetApprovableDrafts);
router.post('/drafts/approved', PostApprovedDrafts);
router.post('/drafts/rejected', PostRejectedDrafts);


module.exports = router;