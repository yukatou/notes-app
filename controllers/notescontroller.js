var { Books } = require('../models/books');
var { Notes } = require('../models/notes');

class NotesController {
  async _getBookId(userId) {
    var books = new Books();
    var list = await books.list(userId);
    if (list.length === 0) {
      return null;
    }
    return list[0].BookID;
  }

  async getIndexPageData(userId, noteId) {
    var list = await this.getNoteList(userId);
    var item = await this.getNote(noteId);
    return { list, item };
  }

  async getCreatePageData(userId) {
    var bookId = await this._getBookId(userId);
    var list = await this.getNoteList(userId);
    var item = await this.createNote(bookId, '', '');
    return { list, item, isCreate: true };
  }

  async getNoteList(userId) {
    var notes = new Notes();
    return await notes.list(userId);
  }

  async getNote(noteId) {
    if (!noteId) {
      return null;
    }
    var notes = new Notes();
    return (await notes.get(noteId) || [])[0];
  }

  async createNote(bookId, title, content) {
    var notes = new Notes();
    return await notes.create(bookId, title, content);
  }

  async updateNote(noteId, bookId, title, content) {
    var notes = new Notes();
    return await notes.update(noteId, bookId, title, content);
  }

  async deleteNote(noteId) {
    var notes = new Notes();
    return await notes.delete(noteId);
  }
}

module.exports = { NotesController };