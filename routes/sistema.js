import * as impl from './impl/sistemaImpl';

export default app => {
  app.get('/sistemas', impl.getSistemas);

  app.post('/sistemas', impl.postSistemas);
};
