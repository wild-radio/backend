import * as impl from './impl/cameraImpl';

export default app => {
  app.get('/cameras/:idCamera/configuracao', impl.getConfiguracao);

  app.put('/cameras/:idCamera/configuracao', impl.putConfiguracao);

  app.post('/cameras/:idCamera/configuracao/confirmacao', impl.postConfirmacaoConfiguracao);

  app.post(
    '/cameras/:idCamera/configuracao/confirmacao/foto',
    impl.postFotoConfirmacaoConfiguracao,
  );

  app.get('/cameras/:idCamera/fotos', impl.getFotos);

  app.post('/cameras/:idCamera/fotos', impl.postFotos);

  app.delete('/cameras/:idCamera/fotos/:idFoto', impl.deleteFotos);
};
