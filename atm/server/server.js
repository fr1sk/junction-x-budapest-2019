// Configuration of express app
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const log = require('./services/logger');
require('dotenv').config(); // This will put .env to process variables

const app = express();

// Unhandled rejection error handler
process.on('unhandledRejection', (reason, p) => {
  log.info('⛔️ Unhandled promise rejection: \n\t', p, '\n\t', 'reason: ', reason);
  log.info('🚧 ', reason.stack);
});

// Setting up the application port
app.set('port', process.env.PORT || 8081);

// support parsing of application/json type post data
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

// templating engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Database configuration
require('./services/dbconfig');

// Routes configuration
require('./routes')(app);

const port = app.get('port');
app.listen(port, () => {
  log.info(`${require('../package.json').name} is 🏃‍  on ${port}`);
});

module.exports = app;
