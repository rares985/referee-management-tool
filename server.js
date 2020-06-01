require("dotenv").config({
  path: __dirname + "server/.env",
});

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");

var Request = require("tedious").Request;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const connection = require("./server/db-conn");

const withAuth = require("./server/auth_middleware");

/* JWT secret */
const secret = process.env.JWT_SECRET;

const executeQuery = (query) => {
  console.log(`Going to execute query ${query}`);
  request = new Request(query, (err, rowCount) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + "rows");
    }
  });

  request.on("row", (cols) => {
    cols.forEach((col) => {
      if (col.value == null) {
        console.log("NULL");
      } else {
        console.log(col.value);
      }
    });
  });

  connection.execSql(request);
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// give server access to static files generated by npm build in client folder
app.use(express.static("./client/dist/"));

/* Declare Routes  ============================== */
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
        var query = `INSERT INTO [dbo].[User] (Username, Password) VALUES ('${username}', '${hash}');`;
        executeQuery(query);
        res.status(200).send(`Welcome to the club, ${username}!`);
      }
    });
  }
});

app.post("/api/authenticate", (req, res) => {
  const { username, password } = req.body;
  console.log(`AUTH: Got request: ${username}, ${password}`);

  if (username === undefined || password === undefined) {
    res.status(401).send("Invalid parameters for authentication");
  } else {
    var query = `SELECT Password FROM User WHERE Username='${username}'`;

    console.log(`Going to execute query ${query}`);
    request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err);
      } else {
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

/* JSON format: {username: rares} */
app.get("/api/personalInfo", (req, res) => {
  const { username } = req.body;
  console.log(`FETCH_PERSONAL_INFO: Got request: ${username}`);

  if (username === undefined) {
    res.status(401).send("Invalid parameters for authentication");
  } else {
    query = `SELECT * FROM sensitive_info
              WHERE id = (SELECT id_sensitive_info FROM referees
                WHERE id_user = (SELECT id FROM users 
                  WHERE username='${username}'))`;
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
      res.status(200).send(obj);
    });

    connection.execSql(request);
  }
});

/* Route for knowing if the cookie is valid */
app.get("/checkToken", withAuth, (req, res) => {
  res.sendStatus(200);
});

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

// console.log that your server is up and running
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on port ${port}`));
