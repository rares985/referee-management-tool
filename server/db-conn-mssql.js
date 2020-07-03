const sql = require("mssql");

var connectionConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  encrypt: true,
};

const pool = new sql.ConnectionPool(connectionConfig);
const poolConnect = pool.connect();

pool.on("error", (err) => {
  console.error(err);
});

module.exports = poolConnect;
