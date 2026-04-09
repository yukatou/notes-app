const SessionManager = require('./sessionmanager');

class Auth {
  static _strategies = {};

  constructor() {
  }

  static registerStrategy(name, strategy) {
    this._strategies[name] = strategy;
  }

  static async signin(name, req, username, password) {
    if (!Auth._strategies[name]) {
      throw new Error(`Strategy "${name}" not found`);
    }

    // Check if username and password are provided
    var storategy = Auth._strategies[name];
    var user = await storategy.signin(username, password);
    if (!user) {
      return null;
    }

    // Remove password from user object
    user = await storategy.serialize(user);

    // If password is correct, create session and redirect to success page
    var sessionManager = new SessionManager();
    await sessionManager.writeCredential(req, user);

    // Success
    return user;
  }

  static async signout(name, req) {
    if (!Auth._strategies[name]) {
      throw new Error(`Strategy "${name}" not found`);
    }

    // Delete user session
    var sessionManager = new SessionManager();
    await sessionManager.deleteCredential(req);
  }

  static authenticate(name) {
    if (!Auth._strategies[name]) {
      throw new Error(`Strategy "${name}" not found`);
    }
    var storategy = Auth._strategies[name];

    return async (req, res, next) => {
      // Add method
      req.isAuthenticated = function () {
        return !!this.user;
      };

      try {
        // Check if user is authenticated
        var sessionManager = new SessionManager();
        if (sessionManager.isAuthenticated(req)) {
          var credential = sessionManager.readCredential(req);
          var user = await storategy.deserialize(credential);
          req.user = user;
          res.locals.user = user;
        } else {
          req.user = null;
        }
        return next();
      } catch (err) {
        return next(err);
      }
    }
  }

  static authorize(name) {
    if (!Auth._strategies[name]) {
      throw new Error(`Strategy "${name}" not found`);
    }

    return async (req, res, next) => {
      try {
        if (req.isAuthenticated()) {
          return next();
        } else {
          res.redirect('/auth/signin');
        }
      } catch (err) {
        return next(err);
      }
    }
  }
}

module.exports = {
  Auth
};