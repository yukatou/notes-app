const { v7: uuid } = require('uuid');
const { MySqlClient } = require('../lib/postgresclient');
const { sql } = require('../lib/query');

class Users {
  _client = null;

  constructor() {
    this._client = new MySqlClient();
  }

  async get(email) {
    var rows = await this._client.executeQuery(
      sql['SELECT_USER'],
      { email }
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }

  async canCreate(email) {
    var rows = await this._client.executeQuery(
      sql['SELECT_USER'],
      { email }
    );
    if (rows.length > 0) {
      return false;
    }
    return true;
  }

  async create(username, email, password) {
    var userId = uuid();

    var rows = await this._client.executeQuery(
      sql['INSERT_USER'],
      { userId, username, password, email }
    );

    var user = await this.get(email);

    return user;
  }
}

module.exports = { Users };