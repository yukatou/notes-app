var router = require('express').Router();
var { ChatsController } = require('../../controllers/chatscontroller');

router.post('/', async (req, res, next) => {
  try {
    var userId = req.user.UserID;
    var topicId = req.body.topicId;
    var message = req.body.message;
    var options = {
      noteIsAttached: req.body.noteIsAttached,
      noteTitle: req.body.noteTitle,
      noteContent: req.body.noteContent,
    };
    var controller = new ChatsController();
    var result = await controller.sendMessage(userId, topicId, message, options);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;