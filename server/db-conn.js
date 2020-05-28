var Connection = require('tedious').Connection
require("dotenv").config({ path: __dirname + '/.env' });

/* DB configuration */
var config = {
  server: process.env.DB_SERVER,
  options: {
    database: process.env.DB_NAME,
    trustServerCertificate: true
  },
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    }
  },
}

const connection = new Connection(config);

module.exports =  connection;