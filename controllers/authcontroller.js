const { Application: config } = require('../lib/config');
const { Auth } = require('../lib/auth/auth');
const { LocalStrategy } = require('../lib/auth/localstrategy');
const { Books } = require('../models/books');
const { Users } = require('../models/users');
const bcrypt = require('bcrypt');

// Singin function
var signin = async (username, password) => {
  // Get user information from database
  const users = new Users();
  const user = await users.get(username);
  if (!user) {
    return null;
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.Password);
  if (!isValid) {
    return null;
  }

  return user;
};

// Modify user object before saving to session
var serialize = async (user) => {
  // Remove password from user object
  delete user.Password;
  return user;
};

// Modify user object after retrieving from session
var deserialize = async (user) => {
  return user;
};

// Register local strategy
Auth.registerStrategy(
  'local',
  new LocalStrategy(
    signin, // Signin function
    serialize, // Serialize function
    deserialize // Deserialize function
  )
);


class AuthController {
  constructor() {
  }

  async _validate(user) {
    const users = new Users();
    var errors = [];

    if (!user.email || !user.password) {
      errors.push('"Email" and "Password" are required');
    } else if (await users.canCreate(user.email) === false) {
      errors.push('"Email" already exists');
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  async _createUser(username, email, rawPassword) {
    // Check if email and password are provided
    if (!email || !rawPassword) {
      throw new Error('"Email" and "Password" are required');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(rawPassword, config.password.saltRounds);
    
    // Save user to database
    const users = new Users();
    var newUser = await users.create(username, email, hashedPassword);

    // Remove password from user object
    delete newUser.Password;

    return newUser;
  }

  async _createBook(userId) {
    const books = new Books();
    const newBook = await books.create(userId, 'Default Book');
    return newBook;
  }

  async signup(user) {
    var newUser, newBook;

    // Check if user is valid
    var result = await this._validate(user);
    if (result.isValid === false) {
      return {
        completed: false,
        user: null,
        book: null,
        errors: result.errors
      };
    }

    // Create user
    newUser = await this._createUser(user.username, user.email, user.password);

    // Create default book
    newBook = await this._createBook(newUser.UserID);

    // return newUser;
    return {
      completed: true,
      user: newUser,
      book: newBook,
      errors: null
    }
  }

  async signin(req, username, password) {
    return await Auth.signin('local', req, username, password);
  }

  async signout(req) {
    return await Auth.signout('local', req);
  }

  static authenticate() {
    return Auth.authenticate('local');
  }

  static authorize() {
    return Auth.authorize('local');
  }
}

module.exports = {
  AuthController
}