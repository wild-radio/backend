import * as impl from './impl/catalogoImpl';

export default app => {
  app.get('/catalogos', impl.getCatalogos);

  app.post('/catalogos', impl.postCatalogos);

  app.put('/catalogos/:idCatalogo', impl.putCatalogos);

  app.delete('/catalogos/:idCatalogo', impl.deleteCatalogos);

  app.get('/catalogos/:idCatalogo/fotos', impl.getFotos);

  app.put('/catalogos/:idCatalogo/fotos/:idFoto', impl.putFotos);

  app.delete('/catalogos/:idCatalogo/fotos/:idFoto', impl.deleteFotos);

  app.put(
    '/catalogos/:idCatalogoOrigem/fotos/transferir-para/:idCatalogoDestino',
    impl.putTransferirFotos,
  );
};
