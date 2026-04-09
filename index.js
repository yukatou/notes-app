const CONFIG = require('./lib/config');
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { AuthController } = require('./controllers/authcontroller');
const PORT = CONFIG.Application.port;

// Set express configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.disable('x-powered-by');

// Set middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  store: new pgSession({
    pool: require('./lib/postgresclient').createConnection(),
    tableName: 'session',
    createTableIfMissing: true,
  }),
  ...CONFIG.Application.session
}));
app.use(AuthController.authenticate());

// Set routes
app.use('/', (() => {
  var router = express.Router();
  router.use('/', require('./routes/index'));
  router.use('/auth', require('./routes/auth'));
  router.use('/notes', require('./routes/notes'));
  return router;
})());
app.use('/api', (() => {
  var router = express.Router();
  router.use('/notes', require('./routes/api/notes'));
  router.use('/chats', require('./routes/api/chats'));
  return router;
})());

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  if (req.url.startsWith('/api')) {
    return res.json({ error: 'Internal Server Error' });
  } else {
    return res.render('error/500', { error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});