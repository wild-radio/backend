import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import db from './database/db';
import cors from './utils/cors';
import routes from './routes/routes';
import log from './utils/log';
import { URL, PORT, SWAGGER_UI } from './constants/network';
import documentation from './swagger';

log.clear();
log.info(`Inicializando servidor...`);

const server = express();

server.use(db.transactionManager);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(log.middleware);
server.use(cors.middleware);
server.use(SWAGGER_UI, swaggerUi.serve, swaggerUi.setup(documentation));

routes(server);

server.listen(PORT, () => {
  log.info(`Servidor inicializado em http://${URL}`);
  log.info(`Documentação disponível em http://${URL}${SWAGGER_UI}`);
  db.test();
});
