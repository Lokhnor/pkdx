const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "35.242.146.225",
  database: "postgres",
  password: "Greenhill33"
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
