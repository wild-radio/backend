import WebSocket from 'ws';
import log from './utils/log';
import NETWORK from './constants/network';

const clients = [];

export const initialize = () => {
  const wss = new WebSocket.Server(
    {
      port: NETWORK.WS_PORT,
      clientTracking: false,
    },
    () => {
      log.info(`Servidor websockets inicializado em ws://${NETWORK.WS_URL}`);
    },
  );
  wss.on('connection', (ws, req) => {
    log.info(`Conexão websockets realizada com ${req.connection.remoteAddress}`);

    ws.on('message', msg => {
      const config = JSON.parse(msg);
      const client = {
        ws,
        config: {
          idCamera: config.idCamera,
        },
      };
      clients.push(client);

      log.info(
        `Conexão websockets configurada com ${req.connection.remoteAddress} (idCamera: ${
          config.idCamera
        })`,
      );
    });

    ws.on('close', () =>
      log.info(`Conexão websockets com ${req.connection.remoteAddress} foi encerrada`),
    );
  });
};

export const notify = (idCamera, conteudo) =>
  clients.forEach((client, index) => {
    if (client.config.idCamera !== idCamera || client.ws.readyState !== 1) {
      return;
    }

    client.ws.send(conteudo);
    clients.splice(index, 1);
  });

export default { initialize, notify };
