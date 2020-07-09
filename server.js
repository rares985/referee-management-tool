const dotenv = require("dotenv").config();

/* 3rd party middleware */
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

/* custom middleware */
const withAuth = require("./server/auth_middleware");

/* Logger */
const morgan = require("morgan");
const winston = require("./server/config/logger");

const expressStaticGzip = require("express-static-gzip");

/* Routers */
const unavailableRouter = require("./server/routers/unavailable.js");
const delegateRouter = require("./server/routers/delegate.js");
const approveRouter = require("./server/routers/approve.js");
const personalRouter = require("./server/routers/personal.js");
const authRouter = require("./server/routers/auth.js");

var Request = require("tedious").Request;
const connection = require("./server/db-conn");

const bcrypt = require("bcryptjs");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("combined", { stream: winston.stream }));

app.use("/api/unavailable", unavailableRouter);
app.use("/api/delegate", delegateRouter);
app.use("/api/approve", approveRouter);
app.use("/api/personal", personalRouter);
app.use("/api/authenticate", authRouter);

app.use(
  "/",
  expressStaticGzip("client/build", {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    setHeaders: function (res, path) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
    },
  })
);

/* =============================== AUTH ROUTES ==================================== */

/* REGISTER route */
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Invalid parameters");
    return;
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      throw err;
    } else {
      var query = `EXEC [dbo].[RegisterNewUser]  @Username = '${username}', @Password = '${hash}';`;
      const request = new Request(query, (err, rowCount) => {
        if (err) {
          res.status(500).send(`Could not register!`);
          console.error(err);
        } else {
          res.status(200).send(`Welcome to the club, ${username}!`);
        }
      });
      connection.execSql(request);
    }
  });
});

/* GET PERSONAL MATCH HISTORY */
app.get("/api/matchHistory", (req, res) => {
  const username = req.query.username;

  if (!username) {
    res.status(400).send("Invalid parameters");
    return;
  }

  var query = `SELECT
      M.MatchNo as 'MatchNumber',
      M.MatchDay as 'MatchDay',
      TI.Name as 'TeamAName',
      TI2.Name as 'TeamBName',
      SI.FirstName + ' ' + SI.LastName as 'FirstRefName',
      SI2.FirstName + ' ' + SI2.LastName as 'SecondRefName'
    FROM[dbo].[Match] M
    INNER JOIN[dbo].[Delegation] D
    ON M.DelegationID = D.ID
    INNER JOIN[dbo].[MatchInfo] MI
    ON M.MatchInfoID = MI.ID
    INNER JOIN[dbo].[Referee] R
    ON D.FirstRefereeID = R.ID
    INNER JOIN[dbo].[Referee] R2
    ON D.SecondRefereeID = R2.ID
    INNER JOIN[dbo].[TeamInfo] TI
    ON MI.TeamAID = TI.ID
    INNER JOIN[dbo].[TeamInfo] TI2
    ON MI.TeamBID = TI2.ID
    INNER JOIN[dbo].[SensitiveInfo] SI
    ON R.SensitiveInfoID = SI.ID
    INNER JOIN[dbo].[SensitiveInfo] SI2
    ON R2.SensitiveInfoID = SI2.ID
    INNER JOIN[dbo].[User] U
    ON R.UserID = U.ID
    OR R2.UserID = U.ID
    WHERE(U.Username = '${username}');`;

  request = new Request(query, (err, rowCount) => {
    if (err) {
      console.error(err);
      res.status(400).send("User information not in database!");
    }
  });

  var matches = [];
  request.on("row", (cols) => {
    let obj = {};
    cols.forEach((col) => {
      obj[col.metadata.colName] = col.value;
    });
    matches.push(JSON.stringify(obj));
  });

  request.on("doneInProc", (r, m, rs, ro) => {
    res.status(200).send(matches);
  });

  connection.execSql(request);
});

app.get("/api/userinfo", (req, res) => {
  const username = req.query.username;

  if (!username) {
    res.status(400).send("Invalid parameters");
    return;
  }

  let user_info = {
    userid: -1,
    delegation: false,
    approval: false,
    team: false,
  };

  var id_query = `SELECT id from [user] WHERE username='${username}'`;
  var id_request = new Request(id_query, (err, rowCount) => {
    if (err) {
      console.error(err);
      res.status(400).send("Could not perform the database query!");
    } else {
      res.status(200).send(user_info);
    }
  });

  id_request.on("row", (cols) => {
    user_info.userid = parseInt(cols[0].value);
  });

  var delegable_query = `[dbo].[GetDelegableCompetitions] ${username}`;
  var delegable_request = new Request(delegable_query, (err, rowCount) => {
    if (err) {
      console.error(err);
      res.status(400).send("Could not perform database query!");
    } else {
      if (rowCount > 0) {
        user_info.delegation = true;
      }
      connection.execSql(id_request);
    }
  });

  var approval_query = `[dbo].[GetApprovableCompetitions] ${username}`;
  var approval_request = new Request(approval_query, (err, rowCount) => {
    if (err) {
      console.error(err);
      res.status(400).send("Could not perform database query!");
    } else {
      if (rowCount > 0) {
        user_info.approval = true;
      }
      connection.execSql(delegable_request);
    }
  });

  var check_cja_query = `[dbo].[CheckIfCJAUser] ${username}`;
  var check_cja_request = new Request(check_cja_query, (err, rowCount) => {
    if (err) {
      console.error(err);
      res.status(400).send("Could not perform database query, please try again.");
    } else {
      if (rowCount > 0) {
        user_info.team = true;
      }
      connection.execSql(approval_request);
    }
  });

  connection.execSql(check_cja_request);
});

app.get("/api/shortlist", (req, res) => {
  const matchid = req.query.id;
  if (matchid === undefined) {
    res.status(400).send("Invalid parameters");
  } else {
    var query = `[dbo].GetRefsAvailableForMatch @MatchID = ${matchid}`;
    let shortlist = [];

    var request = new Request(query, (err, rowCount) => {
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
      shortlist.push(JSON.stringify(obj));
    });

    connection.execSql(request);
  }
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  res.status(err.status || 500);
  res.render("error");
});

connection.on("connect", function (err) {
  if (err) {
    console.error(`Failed to connect to remote database due to ${err}`);
  }
});

connection.connect();

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on port ${port}`));
