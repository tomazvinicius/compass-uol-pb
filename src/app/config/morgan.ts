import morgan from 'morgan';

import Logger from './logger';

const stream: morgan.StreamOptions = {
  write: (message) => Logger.http(message),
};

export default morgan(
  '":method :url HTTP/:http-version" :status :res[content-length]',
  { stream }
);
