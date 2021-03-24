import winston from 'winston';

const { LOG_LEVEL } = process.env;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'pink',
  debug: 'white',
  silly: 'grey'
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const transports = [
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log', level: LOG_LEVEL }),
];

const logger = winston.createLogger({
  levels,
  format,
  defaultMeta: { service: 'you-say-api' },
  transports,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format, level: LOG_LEVEL
  }));
}

export default logger;
