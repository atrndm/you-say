import winston from 'winston';
import { isProduction } from 'src/config';

const { LOG_LEVEL } = process.env;

const levels: winston.config.AbstractConfigSetLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  database: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  database: 'cyan',
  verbose: 'pink',
  debug: 'white',
  silly: 'grey'
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const transports = [
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format,
  }),
  new winston.transports.File({
    filename: 'logs/all.log',
    level: LOG_LEVEL,
    format,
  }),
];

interface CustomLevels extends winston.Logger {
  error: winston.LeveledLogMethod,
  warn: winston.LeveledLogMethod,
  info: winston.LeveledLogMethod,
  http: winston.LeveledLogMethod,
  database: winston.LeveledLogMethod,
  verbose: winston.LeveledLogMethod,
  debug: winston.LeveledLogMethod,
  silly: winston.LeveledLogMethod,
}

const logger:CustomLevels = winston.createLogger({
  levels,
  defaultMeta: { service: 'you-say-api' },
  transports,
}) as CustomLevels;

if (!isProduction) {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.simple()
    ),
    level: LOG_LEVEL
  }));
}

export default logger;
