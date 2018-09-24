// TODO: documentação

export default app => {
  app.get('/catalogos', (req, res) => {
    // TODO: implementação
    res.status(200).send('GET catálogos');
  });

  app.post('/catalogos', (req, res) => {
    const { body } = req;

    // TODO: implementação
    res.status(200).send(body);
  });

  app.put('/catalogos/:idCatalogo', (req, res) => {
    const { idCatalogo } = req.params;
    const { body } = req;

    // TODO: implementação
    res.status(200).send({ idCatalogo, ...body });
  });

  app.delete('/catalogos/:idCatalogo', (req, res) => {
    const { idCatalogo } = req.params;

    // TODO: implementação
    res.status(200).send(`DELETE catálogo ${idCatalogo}`);
  });

  app.get('/catalogos/:idCatalogo/fotos', (req, res) => {
    const { idCatalogo } = req.params;

    // TODO: implementação
    res.status(200).send(`GET fotos catálogo ${idCatalogo}`);
  });

  app.put('/catalogos/:idCatalogo/fotos/:idFoto', (req, res) => {
    const { idCatalogo, idFoto } = req.params;

    // TODO: implementação
    res.status(200).send(`PUT foto ${idFoto} ao catálogo ${idCatalogo}`);
  });

  app.delete('/catalogos/:idCatalogo/fotos/:idFoto', (req, res) => {
    const { idCatalogo, idFoto } = req.params;

    // TODO: implementação
    res.status(200).send(`DELETE foto ${idFoto} do catálogo ${idCatalogo}`);
  });

  app.put('/catalogos/:idCatalogoOrigem/fotos/transferir-para/:idCatalogoDestino', (req, res) => {
    const { idCatalogoOrigem, idCatalogoDestino } = req.params;

    // TODO: implementação
    res.status(200).send(`Transferir fotos de ${idCatalogoOrigem} para ${idCatalogoDestino}`);
  });
};
