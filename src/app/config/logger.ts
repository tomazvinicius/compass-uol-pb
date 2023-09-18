import { createLogger, addColors, format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = (): string => {
  const env = process.env.NODE_ENV ?? 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

addColors(colors);

const formatOptionsConsole = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  colorize({ all: true }),
  printf(
    ({ level, message, timestamp }) =>
      `${timestamp as string}   ${level}: ${message as string}`
  )
);
const formatOptionsLog = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(
    ({ level, message, timestamp }) =>
      `${timestamp as string}   ${level}: ${message as string}`
  )
);

const transportsOptions = [
  new transports.Console({ format: formatOptionsConsole }),
  new transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: formatOptionsLog,
  }),
  new transports.File({ filename: 'logs/all.log', format: formatOptionsLog }),
];

const Logger = createLogger({
  level: level(),
  levels,
  transports: transportsOptions,
});

export default Logger;
