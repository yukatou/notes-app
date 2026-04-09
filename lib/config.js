const fs = require('fs');
const path = require('path');

var getCert = function (target = '') {
  var key = target.toLocaleLowerCase();

  switch (key) {
    case 'azure':
      return {
        ca: fs.readFileSync(path.join(__dirname, './certs/azure-ca.pem'), 'utf8'),
      };
    case 'aws':
      return {
        ca: fs.readFileSync(path.join(__dirname, './certs/aws-ca.pem'), 'utf8'),
      };
    case 'true':
      return {
        rejectUnauthorized: false
      };
    default:
      return undefined;
  }
}

var Database = {
  connection: {
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'postgres',
    database: process.env.PG_DATABASE || 'notes',
    max: 10,
    ssl: getCert(process.env.PG_SSL) || undefined,
  },
};

var Application = {
  port: process.env.PORT || 3000,
  session: {
    name: 'sid',
    secret: process.env.SESSION_SECRET || 'YOUR_SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      secure: false
    }
  },
  password: {
    saltRounds: 10,
    minLength: 8,
    maxLength: 20,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialCharacters: true
  }
};

module.exports = {
  Database,
  Application,
};