const Pool = require("pg").Pool;

const pool = new Pool({
  user: "icarus",
  host: "localhost",
  database: "devsnest",
  password: "tiger",
  port: 5432,
});

module.exports = pool;
