import express from 'express';
import db from './database/db';
import routes from './routes/routes';
import log from './utils/log';
import { URL, PORT, SWAGGER_UI } from './constants/network';
import applyMiddlewares from './utils/middleware';

log.clear();
log.info(`Inicializando servidor...`);

const server = express();

applyMiddlewares(server);

routes(server);

server.listen(PORT, () => {
  log.info(`Servidor inicializado em http://${URL}`);
  log.info(`Documentação disponível em http://${URL}${SWAGGER_UI}`);
  db.test();
});
