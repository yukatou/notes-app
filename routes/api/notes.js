var router = require('express').Router();
var { NotesController } = require('../../controllers/notescontroller');

// GET: /api/note
// Get all notes.
router.get('/', async (req, res, next) => {
  try {
    var controller = new NotesController();
    var list = await controller.getNoteList();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// GET: /api/note/:noteId
// Get a note by id.
router.get('/:noteId', async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    var controller = new NotesController();
    var item = await controller.getNote(noteId);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST: /api/note
// Create a new note.
router.post('/', async (req, res, next) => {
  try {
    const { bookId, title, content } = req.body;
    var controller = new NotesController();
    var item = await controller.createNote(bookId, title, content);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// PUT: /api/note/:noteId
// Update a note.
router.put('/:noteId', async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const { bookId, title, content } = req.body;
    var controller = new NotesController();
    var item = await controller.updateNote(noteId, bookId, title, content);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// DELETE: /api/note/:noteId
// Delete a note.
router.delete('/:noteId', async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    var controller = new NotesController();
    var item = await controller.deleteNote(noteId);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;