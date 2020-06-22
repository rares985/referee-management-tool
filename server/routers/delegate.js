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

  console.log('Executing...');
  console.log(username);

  request.on("row", (cols) => {
    let obj = {};
    cols.forEach((col) => {
      obj[col.metadata.colName] = col.value;
    });
    drafts.push(obj);
  });

  connection.execSql(request);
}

/* Matches to which I can delegate */
router.get('/delegable/matches', GetPersonalDrafts);
router.get('/delegable/shortlist', GetPersonalDrafts);

/* My personal drafts - not yet proposed */
router.get('/drafts/matches', GetPersonalDrafts);
router.get('/drafts/shortlist', GetPersonalDrafts);

/* Drafts which I have proposed - not yet reviewed */
router.get('/proposed/matches', GetPersonalDrafts);
router.get('/proposed/shortlist', GetPersonalDrafts);

/* Rejected drafts which need attention */
router.get('/rejected/matches', GetPersonalDrafts);
router.get('/rejected/shortlist', GetPersonalDrafts);


module.exports = router;