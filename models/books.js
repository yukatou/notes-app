const { v7: uuid } = require('uuid');
const { MySqlClient } = require('../lib/postgresclient');
const { sql } = require('../lib/query');

class Books {
  _client = null;

  constructor() {
    this._client = new MySqlClient();
  }

  async list(userId) {
    return await this._client.executeQuery(
      sql['SELECT_BOOK_LIST'],
      { userId }
    );
  }

  async get(bookId) {
    return await this._client.executeQuery(
      sql['SELECT_BOOK_ITEM'],
      { bookId }
    );
  }

  async create(userId, title) {
    var bookId = uuid();

    var rows = await this._client.executeQuery(
      sql['INSERT_BOOK'],
      { bookId, userId, title }
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }
}

module.exports = { Books };