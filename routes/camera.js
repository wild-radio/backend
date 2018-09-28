import * as impl from './impl/cameraImpl';

export default server => {
  server.get('/cameras/:idCamera/configuracao', impl.getConfiguracao);

  server.put('/cameras/:idCamera/configuracao', impl.putConfiguracao);

  server.post('/cameras/:idCamera/configuracao/confirmacao', impl.postConfirmacaoConfiguracao);

  server.get('/cameras/:idCamera/fotos', impl.getFotos);

  server.delete('/cameras/:idCamera/fotos/:idFoto', impl.deleteFotos);

  server.post('/cameras/integracao/:numeroSerial/:tipoCamera/fotos', impl.postFotos);

  server.post(
    '/cameras/integracao/:numeroSerial/:tipoCamera/configuracao/confirmacao/foto',
    impl.postFotoConfirmacaoConfiguracao,
  );
};
