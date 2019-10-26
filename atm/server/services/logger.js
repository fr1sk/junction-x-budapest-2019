const winston = require('winston');

const { splat, combine, timestamp, printf } = winston.format;

const options = {
  // file: {
  //   level: 'info',
  //   filename: `${appRoot}/logs/app.log`,
  //   handleExceptions: true,
  //   json: true,
  //   maxsize: 5242880, // 5MB
  //   maxFiles: 5,
  //   colorize: false,
  // },
  console: {
    level: 'info',
    handleExceptions: true,
    json: true,
    colorize: true
  }
};

// eslint-disable-next-line no-shadow
const myFormat = printf(({ timestamp, level, message, meta }) => (
  `🤖  ${new Date(timestamp).toLocaleDateString()} ${new Date(timestamp).toLocaleTimeString()} - ${level}: ${message} ${meta ? JSON.stringify(meta) : ''}`
));

const logger = winston.createLogger({
  format: combine(timestamp(), splat(), myFormat),
  transports: [new winston.transports.Console(options.console)]
});

module.exports = logger;
