const merge = require('deepmerge');

const SESSION_KEY = 'crts';

class SessionManager {
  constructor() {
  }

  writeCredential = async (req, credentials) => {
    if (!req.session) { throw new Error('Session not initialized'); }

    return new Promise((resolve, reject) => {
      // Regenerate the session, which is good practice to help guard against forms of session fixation
      req.session.regenerate((err) => {
        if (err) { return reject(err); }

        // Store user information in session, typically a user id
        if (!req.session[SESSION_KEY]) {
          req.session[SESSION_KEY] = {};
        }
        req.session[SESSION_KEY].credentials = credentials;

        // Save the session before redirection to ensure page load does not happen before session is saved
        req.session.save((err) => {
          if (err) { return reject(err); }
          resolve();
        });
      });
    });
  }

  readCredential = (req) => {
    if (!req.session) { throw new Error('Session not initialized'); }
    return req.session[SESSION_KEY]?.credentials || null;
  }

  deleteCredential = (req) => {
    if (!req.session) { throw new Error('Session not initialized'); }
    return new Promise((resolve, reject) => {
      if (req.session[SESSION_KEY]) {
        delete req.session[SESSION_KEY].credentials;
      }

      var prevSession = req.session;

      req.session.save((err) => {
        if (err) { return reject(err); }
        req.session.regenerate((err) => {
          if (err) { return reject(err); }
          merge(req.session, prevSession);
          resolve();
        });
      });
    });
  }

  isAuthenticated = (req) => {
    if (!req.session) { throw new Error('Session not initialized'); }
    return !!req?.session[SESSION_KEY]?.credentials
  }
}

module.exports = SessionManager;