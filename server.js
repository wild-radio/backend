import express from 'express';
import bodyParser from 'body-parser';
import ip from 'ip';
import routes from './routes/routes';
import log from './utils/log';
import { PORT } from './constants/network';

log.clear();
log.info(`Inicializando servidor...`);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(log.middleware);

routes(app);

const server = app.listen(PORT, () => {
  const endereco = `http://${ip.address()}:${server.address().port}`;
  log.info(`Servidor inicializado em ${endereco}`);
});
