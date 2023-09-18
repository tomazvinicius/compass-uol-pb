import App from './app';
import Logger from './app/config/logger';

const app = new App();

app.init().listen(process.env.PORT ?? 5000, () => {
  Logger.log(
    'info',
    `App starting at http://localhost:${process.env.PORT ?? 5000}\nEnvs: ${
      process.env.TARGET ?? 'local'
    }`
  );
});
