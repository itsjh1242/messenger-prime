const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0112",
  database: "chat-app",
});

module.exports = pool;
