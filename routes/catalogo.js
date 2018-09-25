import * as impl from './impl/catalogoImpl';

export default server => {
  server.get('/catalogos', impl.getCatalogos);

  server.post('/catalogos', impl.postCatalogos);

  server.put('/catalogos/:idCatalogo', impl.putCatalogos);

  server.delete('/catalogos/:idCatalogo', impl.deleteCatalogos);

  server.get('/catalogos/:idCatalogo/fotos', impl.getFotos);

  server.put('/catalogos/:idCatalogo/fotos/:idFoto', impl.putFotos);

  server.delete('/catalogos/:idCatalogo/fotos/:idFoto', impl.deleteFotos);

  server.put(
    '/catalogos/:idCatalogoOrigem/fotos/transferir-para/:idCatalogoDestino',
    impl.putTransferirFotos,
  );
};
