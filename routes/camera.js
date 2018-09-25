import * as impl from './impl/cameraImpl';

export default server => {
  server.get('/cameras/:idCamera/configuracao', impl.getConfiguracao);

  server.put('/cameras/:idCamera/configuracao', impl.putConfiguracao);

  server.post('/cameras/:idCamera/configuracao/confirmacao', impl.postConfirmacaoConfiguracao);

  server.post(
    '/cameras/:idCamera/configuracao/confirmacao/foto',
    impl.postFotoConfirmacaoConfiguracao,
  );

  server.get('/cameras/:idCamera/fotos', impl.getFotos);

  server.post('/cameras/:idCamera/fotos', impl.postFotos);

  server.delete('/cameras/:idCamera/fotos/:idFoto', impl.deleteFotos);
};
