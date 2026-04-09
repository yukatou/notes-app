var router = require('express').Router();

router.get('/', (req, res, next) => {
  try {
    res.render('index');
  } catch (err) {
    next(err);
  }
});

module.exports = router;