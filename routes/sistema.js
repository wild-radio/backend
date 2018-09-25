import * as impl from './impl/sistemaImpl';

export default server => {
  server.get('/sistemas', impl.getSistemas);

  server.post('/sistemas', impl.postSistemas);
};
