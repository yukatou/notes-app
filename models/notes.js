const { v7: uuid } = require('uuid');
const { MySqlClient } = require('../lib/postgresclient');
const { sql: SQL } = require('../lib/query');

class Notes {
  _client = null;

  constructor() {
    this._client = new MySqlClient();
  }

  async list(userId) {
    return await this._client.executeQuery(
      SQL['SELECT_NOTE_LIST'],
      { userId }
    );
  }

  async get(noteId) {
    return await this._client.executeQuery(
      SQL['SELECT_NOTE_ITEM'],
      { noteId }
    );
  }

  async create(bookId, title, content) {
    var noteId = uuid();

    await this._client.executeQuery(
      SQL['INSERT_NOTE'],
      { noteId, bookId, title, content }
    );

    return {
      NoteID: noteId,
      BookID: bookId,
      Title: title,
      Content: content
    };
  }

  async update(noteId, bookId, title, content) {
    return await this._client.executeQuery(
      SQL['UPDATE_NOTE'],
      { noteId, bookId, title, content }
    );
  }

  async delete(noteId) {
    return await this._client.executeQuery(
      SQL['DELETE_NOTE'],
      { noteId }
    );
  }
}

module.exports = { Notes };