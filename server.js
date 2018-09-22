import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';

const PORT = 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

const server = app.listen(PORT, () => {
  process.stdout.write('\x1B[2J');
  console.log('Servidor rodando na porta', server.address().port);
});
