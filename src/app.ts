import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';

import './infra/databases/MongoDatabase';
import routes from './infra/routes/index.router';
import swaggerDocs from './swagger.json';
import Morgan from './app/config/morgan';

class App {
  public server: express.Application;

  public constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  public init(): express.Application {
    return this.server;
  }

  private middlewares(): void {
    this.server.use(express.json({}));
    this.server.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.server.use(cors());
    this.server.use(Morgan);
  }

  private routes(): void {
    this.server.use(...routes);
    this.server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  }
}

export default App;
