const router = require('express').Router();
const { AuthController } = require('../controllers/authcontroller');


router.get('/signin', (req, res, next) => {
  try {
    res.render('auth/signin');
  } catch (err) {
    next(err);
  }
});

router.post('/signin', async (req, res, next) => {
  try {
    var username = req.body.username;
    var password = req.body.password;

    const controller = new AuthController();
    var user = await controller.signin(req, username, password);
    if (!user) {
      return res.render('auth/signin', { message: 'Invalid username or password' });
    }

    res.redirect('/notes');
  } catch (err) {
    next(err);
  }
});

router.post('/signout', async (req, res, next) => {
  try {
    const controller = new AuthController();
    await controller.signout(req);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.get('/signup', (req, res, next) => {
  try {
    res.render('auth/signup');
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const candidate = { username, email, password };

    const controller = new AuthController();
    const result = await controller.signup(candidate);
    if (result.completed === false) {
      return res.render('auth/signup', { message: (result.errors || []).join('\r\n') });
    }

    res.redirect('/auth/complete');
  } catch (err) {
    next(err);
  }
});

router.get('/complete', (req, res, next) => {
  try {
    res.render('auth/complete');
  } catch (err) {
    next(err);
  }
});

module.exports = router;