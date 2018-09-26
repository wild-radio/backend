import WebSocket from 'ws';
import log from './utils/log';
import NETWORK from './constants/network';

export const instanciar = () => {
  const wss = new WebSocket.Server(
    {
      port: NETWORK.WS_PORT,
    },
    () => {
      log.info(`Servidor websockets inicializado em ws://${NETWORK.WS_URL}`);
    },
  );
  wss.on('connection', (ws, req) => {
    wss.clients.forEach(client => {
      log.info(client);
    });
    log.info(`Conexão websockets realizada com ${req.connection.remoteAddress}`);
  });
};

export default { instanciar };
