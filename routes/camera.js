export default app => {
  app.get('/cameras/:idCamera/configuracao', (req, res) => {
    const { idCamera } = req.params;

    // TODO: implementação
    res.status(200).send(`GET configuração camera ${idCamera}`);
  });

  app.put('/cameras/:idCamera/configuracao', (req, res) => {
    const { idCamera } = req.params;
    const { body } = req;

    // TODO: implementação
    // (Atualizar o arquivo de configuração)
    res.status(200).send({ idCamera, ...body });
  });

  app.post('/cameras/:idCamera/configuracao/confirmacao', (req, res) => {
    const { idCamera } = req.params;

    // TODO: implementação
    // (Atualizar o arquivo de configuração, mas não o banco)
    // (Abrir um websocket e esperar a chegada da foto)
    res.status(200).send(`Websocket ${idCamera}`);
  });

  app.post('/cameras/:idCamera/configuracao/confirmacao/foto', (req, res) => {
    const { idCamera } = req.params;

    // TODO: implementação
    // (Enviar foto recebida pelo websocket)
    res.status(200).send(`Websocket ${idCamera}`);
  });

  app.get('/cameras/:idCamera/fotos', (req, res) => {
    const { idCamera } = req.params;

    // TODO: implementação
    res.status(200).send(`GET fotos camera ${idCamera}`);
  });

  app.post('/cameras/:idCamera/fotos', (req, res) => {
    const { idCamera } = req.params;
    const { body } = req;

    // TODO: implementação
    res.status(200).send({ idCamera, ...body });
  });

  app.delete('/cameras/:idCamera/fotos/:idFoto', (req, res) => {
    const { idCamera, idFoto } = req.params;

    // TODO: implementação
    res.status(200).send(`DELETE foto ${idFoto} da câmera ${idCamera}`);
  });
};
