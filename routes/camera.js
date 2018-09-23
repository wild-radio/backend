// TODO: documentação

export default app => {
  // TODO: documentação
  // Consulta a configuração de uma câmera
  // Retorna: ConfiguracaoApi
  app.get('/cameras/:idCamera/configuracao', (req, res) => {
    const { idCamera } = req.params;

    // TODO: implementação
    res.status(200).send(`GET configuração camera ${idCamera}`);
  });

  // TODO: documentação
  // Atualiza a configuração de uma câmera
  // Recebe: ConfiguracaoApi
  // Retorna: ConfiguracaoApi
  app.put('/cameras/:idCamera/configuracao', (req, res) => {
    const { idCamera } = req.params;
    const { body } = req;

    // TODO: implementação
    // (Atualizar o arquivo de configuração)
    res.status(200).send({ idCamera, ...body });
  });

  // TODO: documentação
  // Envia uma solicitação de foto para confirmação do ajuste do ângulo
  app.post('/cameras/:idCamera/configuracao/confirmacao', (req, res) => {
    const { idCamera } = req.params;

    // TODO: implementação
    // (Atualizar o arquivo de configuração, mas não o banco)
    // (Abrir um websocket e esperar a chegada da foto)
    res.status(200).send(`Websocket ${idCamera}`);
  });

  // TODO: documentação
  // Envia a foto de confirmação do ajuste do ângulo
  // Recebe: FotoApi
  app.post('/cameras/:idCamera/configuracao/confirmacao/foto', (req, res) => {
    const { idCamera } = req.params;

    // TODO: implementação
    // (Enviar foto recebida pelo websocket)
    res.status(200).send(`Websocket ${idCamera}`);
  });

  // TODO: documentação
  // Consulta as novas fotos de uma câmera
  // Retorna: [FotoApi]
  app.get('/cameras/:idCamera/fotos', (req, res) => {
    const { idCamera } = req.params;

    // TODO: implementação
    res.status(200).send(`GET fotos camera ${idCamera}`);
  });

  // TODO: documentação
  // Insere uma novo foto para uma câmera
  // Recebe: FotoApi
  app.post('/cameras/:idCamera/fotos', (req, res) => {
    const { idCamera } = req.params;
    const { body } = req;

    // TODO: implementação
    res.status(200).send({ idCamera, ...body });
  });

  // TODO: documentação
  // Descarta uma foto de uma câmera
  app.delete('/cameras/:idCamera/fotos/:idFoto', (req, res) => {
    const { idCamera, idFoto } = req.params;

    // TODO: implementação
    res.status(200).send(`DELETE foto ${idFoto} da câmera ${idCamera}`);
  });
};
