// TODO: documentação

export default app => {
  // TODO: documentação
  // Lista os catálogos existentes
  // Retorna: [CatalogoApi]
  app.get('/catalogos', (req, res) => {
    // TODO: implementação
    res.status(200).send('GET catálogos');
  });

  // TODO: documentação
  // Cria um novo catálogo
  // Recebe: CatalogoApi
  // Retorna: CatalogoApi
  app.post('/catalogos', (req, res) => {
    const { body } = req;

    // TODO: implementação
    res.status(200).send(body);
  });

  // TODO: documentação
  // Edita um catálogo existente
  // Recebe: CatalogoApi
  // Retorna: CatalogoApi
  app.put('/catalogos/:idCatalogo', (req, res) => {
    const { idCatalogo } = req.params;
    const { body } = req;

    // TODO: implementação
    res.status(200).send({ idCatalogo, ...body });
  });

  // TODO: documentação
  // Remove um catálogo, removendo todas as suas fotos
  app.delete('/catalogos/:idCatalogo', (req, res) => {
    const { idCatalogo } = req.params;

    // TODO: implementação
    res.status(200).send(`DELETE catálogo ${idCatalogo}`);
  });

  // TODO: documentação
  // Consulta as fotos de um catálogo
  // Retorna: [FotoApi]
  app.get('/catalogos/:idCatalogo/fotos', (req, res) => {
    const { idCatalogo } = req.params;

    // TODO: implementação
    res.status(200).send(`GET fotos catálogo ${idCatalogo}`);
  });

  // TODO: documentação
  // Adiciona uma foto existente a um catálogo
  app.put('/catalogos/:idCatalogo/fotos/:idFoto', (req, res) => {
    const { idCatalogo, idFoto } = req.params;

    // TODO: implementação
    res.status(200).send(`PUT foto ${idFoto} ao catálogo ${idCatalogo}`);
  });

  // TODO: documentação
  // Remove uma foto de um catálogo, removendo-a do sistema
  app.delete('/catalogos/:idCatalogo/fotos/:idFoto', (req, res) => {
    const { idCatalogo, idFoto } = req.params;

    // TODO: implementação
    res.status(200).send(`DELETE foto ${idFoto} do catálogo ${idCatalogo}`);
  });

  // TODO: documentação
  // Transfere todas as fotos de um catálogo para outro
  app.put('/catalogos/:idCatalogoOrigem/fotos/transferir-para/:idCatalogoDestino', (req, res) => {
    const { idCatalogoOrigem, idCatalogoDestino } = req.params;

    // TODO: implementação
    res.status(200).send(`Transferir fotos de ${idCatalogoOrigem} para ${idCatalogoDestino}`);
  });
};
