// Mongo config
const mongoose = require('mongoose');
const log = require('./logger');

mongoose.Promise = global.Promise;

const mongooseOptions = {
  // useMongoClient: true,
  autoIndex: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  autoReconnect: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGO_URI, mongooseOptions);

// This useCreateIndex is set only because we had a depricated warning
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', err => {
  log.error('🗃  Mongoose error: ', err);
});

mongoose.connection.on('connected', () => {
  log.info('🗃  Connection to DB established successfully');
  log.info('➖ '.repeat(22));
});
