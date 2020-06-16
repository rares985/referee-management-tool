const dotenv = require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");

var Request = require("tedious").Request;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const connection = require("./server/db-conn");

const withAuth = require("./server/auth_middleware");

const expressStaticGzip = require("express-static-gzip");

/* JWT secret */
const secret = process.env.JWT_SECRET;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  "/",
  expressStaticGzip("client/dist", {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    setHeaders: function (res, path) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
    },
  })
);

// give server access to static files generated by npm build in client folder
// app.use(express.static("./client/dist/"));

/* =============================== AUTH ROUTES ==================================== */

/* REGISTER route */
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  console.log(`REGISTER: Got request: ${username}, ${password}`);

  if (username === undefined || password === undefined) {
    res.status(400).send("Invalid parameters for registration");
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        throw err;
      } else {
        var query = `EXEC [dbo].[RegisterNewUser]  @Username = '${username}', @Password = '${hash}';`;
        const request = new Request(query, (err, rowCount) => {
          if (err) {
            res.status(401).send(`Could not register!`);
            console.error(err);
          } else {
            res.status(200).send(`Welcome to the club, ${username}!`);
          }
        });
        connection.execSql(request);
      }
    });
  }
});

/* AUTHENTICATE route */
app.post("/api/authenticate", (req, res) => {
  const { username, password } = req.body;
  console.log(`AUTH: Got request: ${username}, ${password}`);

  if (username === undefined || password === undefined) {
    res.status(401).send("Invalid parameters for authentication");
  } else {
    var query = `SELECT Password FROM [dbo].[User] WHERE Username='${username}'`;

    console.log(`Going to execute query ${query}`);
    request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err);
      } else {
        if (rowCount === 0) {
          res.status(401).send("Login failure!");
        }
        console.log(`Got ${rowCount} rows`);
      }
    });

    request.on("row", (cols) => {
      cols.forEach((col) => {
        if (col.value == null) {
          console.log("Got NULL value");
        } else {
          bcrypt.compare(password, col.value, (err, result) => {
            if (err) {
              throw err;
            } else {
              console.log(result);
              if (result) {
                console.log("Password Check OK. Issuing Token");
                const payload = { username };
                const token = jwt.sign(payload, secret, {
                  expiresIn: "1h",
                });
                res.cookie("token", token, { httpOnly: true }).sendStatus(200);
              } else {
                res.status(401).send("Login failure!");
              }
            }
          });
        }
      });
    });

    connection.execSql(request);
  }
});

/* =============================== BUSINESS ROUTES ==================================== */
/* GET PERSONAL INFO */
app.get("/api/personalInfo", (req, res) => {
  const username = req.query.username;
  console.log(`FETCH_PERSONAL_INFO: Got request: ${username}`);

  if (username === undefined) {
    res.status(401).send("Invalid parameters for authentication");
  } else {
    var query = `[dbo].[GetPersonalInfo] '${username}';`;

    console.log(`Going to execute query ${query}`);
    request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err);
        res.status(400).send("User information not in database!");
      } else {
        console.log(`Got ${rowCount} rows`);
      }
    });

    request.on("row", (cols) => {
      let obj = {};
      cols.forEach((col) => {
        obj[col.metadata.colName] = col.value;
      });
      console.log(`Sending ${JSON.stringify(obj)}`);
      res.status(200).send(JSON.stringify(obj));
    });

    connection.execSql(request);
  }
});

/* UPDATE PERSONAL INFO */
app.post("/api/personalInfo", (req, res) => {
  const { username, address, firstName, lastName, mobilePhone, email } = req.body;
  console.log(
    `UPDATE_PERSONAL_INFO: Got request: ${username}, ${address}, ${firstName}, ${lastName}, ${mobilePhone}, ${email}`
  );

  if (
    username === undefined ||
    address === undefined ||
    firstName === undefined ||
    lastName === undefined ||
    mobilePhone === undefined ||
    email === undefined
  ) {
    res.status(401).send("Invalid parameters!");
  } else {
    var query = `[dbo].[UpdatePersonalInfo]
      @Username = '${username}',
      @FirstName = '${firstName}',
      @LastName = '${lastName}',
      @Address = '${address}',
      @Email = '${email}',
      @PhoneNumber = '${mobilePhone}'`;

    console.log(`Going to execute query ${query}`);
    request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err);
        res.status(400).send("User information not in database!");
      } else {
        console.log(`Got ${rowCount} rows`);
      }
    });

    request.on("row", (cols) => {
      let obj = {};
      cols.forEach((col) => {
        obj[col.metadata.colName] = col.value;
      });
      console.log(`Sending ${JSON.stringify(obj)}`);
      res.status(200).send(JSON.stringify(obj));
    });

    connection.execSql(request);
  }
});

/* GET UNAVAILABILITY PERIODS */
app.get("/api/addUnavailable", (req, res) => {
  const username = req.query.username;

  if (username === undefined) {
    res.status(400).send("Invalid params...");
  } else {
    console.log(`GET_UNAVAILABILITY_PERIOD: Got request: ${username}`);
    var query = `[dbo].[GetUnavailabilityPeriod] @Username='${username}'`;
    console.log(`Going to execute query ${query}`);

    let periods = [];
    request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err);
        res.status(400).send("User information not in database!");
      } else {
        res.status(200).send(periods);
      }
    });

    request.on("row", (cols) => {
      let obj = {};
      cols.forEach((col) => {
        obj[col.metadata.colName] = col.value;
      });
      console.log(`Adding ${JSON.stringify(obj)}`);
      periods.push(JSON.stringify(obj));
    });

    connection.execSql(request);
  }
});

/* ADD UNAVAILABILITY PERIOD */
app.post("/api/addUnavailable", (req, res) => {
  const { username, startDate, endDate } = req.body;

  if (username === undefined || startDate === undefined || endDate === undefined) {
    res.status(400).send("Invalid params...");
  } else {
    console.log(`ADD_UNAVAILABILITY_PERIOD: Got request: ${username} ${startDate} ${endDate}`);
    var search_query = `SELECT 
        * 
      FROM [dbo].[UnavailabilityPeriod] UP
      INNER JOIN[dbo].[Referee] R
        ON UP.RefereeID = R.ID
      INNER JOIN[dbo].[User] U
        ON R.UserID = U.ID
      WHERE(U.Username = '${username}' 
        AND UP.StartDate = CONVERT(DATETIME, '${startDate}', 105)
        AND UP.EndDate = CONVERT(DATETIME, '${endDate}', 105));`;
    console.log(`Going to execute query ${search_query}`);

    var insert_query = `INSERT INTO [dbo].[UnavailabilityPeriod](StartDate, EndDate, RefereeID)
    VALUES
      (CONVERT(DATETIME, '${startDate}', 105),
      CONVERT(DATETIME, '${endDate}', 105), 
      (SELECT
          R.ID
      FROM [dbo].[Referee] R
      INNER JOIN [dbo].[User] U
        ON R.UserID = U.ID
      WHERE U.Username='${username}'));`;

    var insert_request = new Request(insert_query, (err, rowCount) => {
      if (err) {
        console.error(err);
        res.status(400).send("Failed insert query");
      } else {
        res.status(200).send("OK. Added.");
      }
    });

    var search_request = new Request(search_query, (err, rowCount) => {
      if (err) {
        console.error(err);
        res.status(400).send("Failed search query.");
      } else if (rowCount >= 1) {
        res.status(400).send("DUPLICATE");
      } else {
        console.log(`Going to execute query ${insert_query}`);
        connection.execSql(insert_request);
      }
    });
    connection.execSql(search_request);
  }
});

/* GET PERSONAL MATCH HISTORY */
app.get("/api/matchHistory", (req, res) => {
  const username = req.query.username;
  console.log(`FETCH_MATCH_HISTORY: Got request: ${username}`);

  if (username === undefined) {
    res.status(401).send("Invalid parameters for authentication");
  } else {
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

    console.log(`Going to execute query ${query}`);
    request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err);
        res.status(400).send("User information not in database!");
      } else {
        console.log(`Got ${rowCount} rows`);
      }
    });

    var matches = [];
    request.on("row", (cols) => {
      let obj = {};
      cols.forEach((col) => {
        obj[col.metadata.colName] = col.value;
      });
      console.log(`Adding ${JSON.stringify(obj)}`);
      matches.push(JSON.stringify(obj));
    });

    request.on("doneInProc", (r, m, rs, ro) => {
      res.status(200).send(matches);
    });

    connection.execSql(request);
  }
});

app.get("/api/userinfo", (req, res) => {
  const username = req.query.username;
  console.log(`FETCH_PERSONAL_INFO: Got request: ${username}`);

  if (username === undefined) {
    res.status(401).send("Invalid parameters for authentication");
  } else {

    let user_info = {
      userid: -1,
      HasDelegationRights: false,
      HasApprovalRights: false,
      HasTeamRights: false
    };

    var id_query = `SELECT id from [user] WHERE username='${username}'`;
    var id_request = new Request(id_query, (err, rowCount) => {
      if (err) {
        console.error(err);
        res.status(400).send("Could not perform the database query!");
      } else {
        console.log('id_request OK');
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
        console.log('delegable_request OK');
        if (rowCount > 0) {
          user_info.HasDelegationRights = true;
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
        console.log('approval_request OK');
        if (rowCount > 0) {
          user_info.HasApprovalRights = true;
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
        console.log('check_cja_request OK');
        if (rowCount > 0) {
          user_info.HasTeamRights = true;
        }
        connection.execSql(approval_request);
      }
    });

    connection.execSql(check_cja_request);

  }
});


app.post("/api/drafts", (req, res) => {

  var base_query = `INSERT INTO delegation_draft(created_by, first_referee_id, second_referee_id, observer_id, match_id) VALUES`;
  let value_rows = req.body.matches.map(draft =>
    `(${draft.created_by}, ${draft.first_referee_id}, ${draft.second_referee_id}, ${draft.observer_id}, ${draft.match_id})`
  );

  var query = `${base_query} ${value_rows.join(',')};`;
  console.log(query);

  res.status(200).send("OK");

});

app.get("/api/shortlist", (req, res) => {
  const matchid = req.query.id;
  console.log(`REFEREE_SHORTLIST: Got request: ${matchid}`);
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
      console.log(`Adding ${JSON.stringify(obj)}`);
      shortlist.push(JSON.stringify(obj));
    });

    connection.execSql(request);
  }
});

app.get("/api/eligiblefordelegable", (req, res) => {
  const username = req.query.username;
  console.log(`ELIGIBLE_FOR_DELEGATION_PER_MATCHID: Got request ${username}`);

  if (username === undefined) {
    res.status(400).send("Invalid parameters");
  } else {
    var query = `[dbo].[EligibleRefsForDelegableMatches] ${username}`;

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
      console.log(`Adding ${JSON.stringify(obj)}`);
      shortlist.push(JSON.stringify(obj));
    });

    connection.execSql(request);
  }


})

app.get("/api/publicmatches", (req, res) => {
  console.log(`GET_PUBLIC_MATCHES: Got request`);

  var query = `[dbo].[GetPublicMatches]`;
  let matches = [];
  var request = new Request(query, (err, rowCount) => {
    if (err) {
      console.error(err);
      res.status(400).send("Failed to query the database");
    } else {
      res.status(200).send(matches);
    }
  });

  request.on("row", (cols) => {
    let obj = {};
    cols.forEach((col) => {
      obj[col.metadata.colName] = col.value;
    });
    console.log(`Adding ${JSON.stringify(obj)}`);
    matches.push(JSON.stringify(obj));
  });

  connection.execSql(request);
})

app.get("/api/delegablematches", (req, res) => {
  const username = req.query.username;
  console.log(`GET_DELEGABLE_MATCHES: Got request: ${username}`);

  if (username === undefined) {
    res.status(401).send("Invalid parameters for authentication");
  } else {
    var query = `[dbo].[GetMyDelegableMatches] '${username}';`;

    console.log(`Going to execute query ${query}`);

    var matches = [];

    var request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err);
        res.status(400).send("Failed search query");
      } else {
        res.status(200).send(matches);
      }
    });

    request.on("row", (cols) => {
      let obj = {};
      cols.forEach((col) => {
        obj[col.metadata.colName] = col.value;
      });
      console.log(`Adding ${JSON.stringify(obj)}`);
      matches.push(JSON.stringify(obj));
    });

    connection.execSql(request);
  }
});

/* =============================== SERVICE ROUTES ==================================== */
/* Service routes for handling cookies & JWT tokens */
app.get("/checkToken", (req, res) => {
  res.sendStatus(200);
});

/* Logout , for deleting the cookie */
app.get("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
});

/* =============================== DEFAULT ROUTES ==================================== */

/* Default route, which serves the frontend */
app.get("/*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "client", "dist"),
  });
});

connection.on("connect", function (err) {
  if (err) {
    console.error(`Failed to connect to remote database due to ${err}`);
  } else {
    console.log("Successfully connected to database!");
  }
});

connection.connect();

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on port ${port}`));
