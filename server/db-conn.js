const path = require('path');
require("dotenv").config({
  path: path.resolve(__dirname, '..', '.env')
});

var Connection = require("tedious").Connection;

console.log(process.env.DB_SERVER);
/* DB configuration */
var config = {
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
    },
  },
};

const connection = new Connection(config);

module.exports = connection;
