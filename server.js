import express from 'express';
import webSocketServer from './websocket';
import db from './database/db';
import routes from './routes/routes';
import log from './utils/log';
import applyMiddlewares from './utils/middleware';
import NETWORK from './constants/network';

log.clear();
log.info(`Inicializando servidor...`);

const server = express();

applyMiddlewares(server);

routes(server);

server.listen(NETWORK.PORT, () => {
  log.info(`Servidor inicializado em http://${NETWORK.URL}`);
  log.info(`Documentação disponível em http://${NETWORK.URL}${NETWORK.SWAGGER_UI}`);
  webSocketServer.instanciar();
  db.test();
});
