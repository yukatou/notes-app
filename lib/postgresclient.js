const { Pool } = require('pg');
const { Database: config } = require('./config');

const pool = new Pool(config.connection);

function convertNamedToPositional(sql, params) {
  if (!params) return { sql, values: [] };
  const values = [];
  const nameToIndex = {};
  const converted = sql.replace(/:(\w+)/g, (_, name) => {
    if (!(name in nameToIndex)) {
      values.push(params[name]);
      nameToIndex[name] = values.length;
    }
    return `$${nameToIndex[name]}`;
  });
  return { sql: converted, values };
}

class MySqlClient {
  async executeQuery(query, parameters) {
    const { sql: convertedSql, values } = convertNamedToPositional(query, parameters);
    const result = await pool.query(convertedSql, values);
    return result.rows;
  }
}

var createConnection = function () {
  return pool;
};

module.exports = { MySqlClient, createConnection };
