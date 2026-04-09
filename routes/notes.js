var router = require('express').Router();
var { NotesController } = require('../controllers/notescontroller');
const { AuthController } = require('../controllers/authcontroller');

router.use(AuthController.authorize());

router.get('/', async (req, res, next) => {
  try {
    var userId = req.user.UserID;
    var controller = new NotesController();
    var data = await controller.getIndexPageData(userId);
    res.render('notes/index', data);
  } catch (err) {
    next(err);
  }
});

router.get('/new', async (req, res, next) => {
  try {
    var userId = req.user.UserID;
    var controller = new NotesController();
    var data = await controller.getCreatePageData(userId);
    res.render('notes/create', data);
  } catch (err) {
    next(err);
  }
});

router.get('/:noteId(\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12})', async (req, res, next) => {
  try {
    var userId = req.user.UserID;
    var noteId = req.params.noteId;
    var controller = new NotesController();
    var data = await controller.getIndexPageData(userId, noteId);
    res.render('notes/edit', data);
  } catch (err) {
    next(err);
  }
});

router.get('/delete/:noteId(\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12})', async (req, res, next) => {
  try {
    var noteId = req.params.noteId;
    var controller = new NotesController();
    await controller.deleteNote(noteId);
    res.redirect('/notes');
  } catch (err) {
    next(err);
  }
});

module.exports = router;