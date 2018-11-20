import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import db from '../database/db';
import cors from './cors';
import log from './log';
import { SWAGGER_UI } from '../constants/network';
import documentation from '../swagger';

export default server => {
  let lastResponse = null;
  server.use((req, res, next) => {
    lastResponse = res;
    next();
  });
  process
    .on('unhandledRejection', err => {
      log.error(err);
      lastResponse.status(500).send('Erro interno');
    })
    .on('uncaughtException', err => {
      log.error(err);
      lastResponse.status(500).send('Erro interno');
    });

  server.use(db.transactionManager);
  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  server.use(log.middleware);
  server.use(cors.middleware);
  server.use(SWAGGER_UI, swaggerUi.serve, swaggerUi.setup(documentation));
};
