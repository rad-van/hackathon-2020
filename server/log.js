const winston = require('winston');
const path = require('path');

const logLevels = {
  error: 0,
  info: 1,
  debug: 2,
};

const logTrans = (() => {
  const customFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((info) => `${info.timestamp} ${info.message}`)
  );
  const trans = [];
  const node = process.env.NODE_ENV;
  if (node === 'docker') {
    // When running inside a docker container, messages sent to the
    // console (i.e. stdout and stderr) are forwarded to the docker
    // logs collector.
    trans.push(new winston.transports.Console(
      {
        format: customFormat,
        level: process.env.LOGGING_LEVEL || 'info',
        levels: logLevels,
        json: false,
        colorize: false,
      }
    ));
  } else {
    // normal (i.e. undefined) or 'dev'
    trans.push(new winston.transports.File(
      {
        format: customFormat,
        level: process.env.LOGGING_LEVEL || 'info',
        levels: logLevels,
        json: false,
        filename: path.join(process.env.LOGGING_PATH || '/var/log',
                            'alamod.log'),
        maxsize: 1048576, // in bytes, 1MB
        maxFiles: 10,
        tailable: true,
        zippedarchive: false,
      }
    ));
  }

  if (node === 'dev') {
    trans.push(new winston.transports.Console(
      {
        format: customFormat,
        level: process.env.DEBUG_LOGGING_LEVEL || 'debug',
        levels: logLevels,
        json: false,
        colorize: false,
        // timestamp: true,
      }
    ));
  }
  return trans;
})();

const logger = winston.createLogger({
  levels: logLevels,
  transports: logTrans,
});

const format = (args) => {
  return args.reduce((msg, arg) => {
    if (typeof(arg) === 'string') {
      return msg + ' ' + arg;
    } else {
      return msg + ' ' + JSON.stringify(arg);
    }
  }, '');
};

const INF = (...args) => logger.log('info', format(args));
const DEB = (...args) => logger.log('debug', format(args));
const ERR = (...args) => logger.log('error', format(args));

module.exports = {
  INF, DEB, ERR,
  logger: {log: (info) => logger.log('info', info.message)},
};
