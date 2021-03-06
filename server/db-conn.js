const path = require('path');
require("dotenv").config({
  path: path.resolve(__dirname, '..', '.env')
});

var Connection = require("tedious").Connection;

/* DB configuration */
var connectionConfig = {
  server: process.env.DB_SERVER,
  options: {
    database: process.env.DB_NAME,
    trustServerCertificate: true,
    encrypt: true,
  },
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    }
  }
};

const connection = new Connection(connectionConfig);


module.exports = connection;
