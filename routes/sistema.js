// TODO: documentação

export default app => {
  // TODO: documentação
  // Consulta os sistemas existentes
  // Retorna: [SistemaApi]
  app.get('/sistemas', (req, res) => {
    // TODO: implementação
    res.status(200).send(`GET sistemas`);
  });

  // TODO: documentação
  // Adiciona um novo sistema
  // Recebe: SistemaApi
  // Retorna: SistemaApi
  app.post('/sistemas', (req, res) => {
    const { body } = req;

    // TODO: implementação
    res.status(200).send({ ...body });
  });

  // TODO: documentação
  // Atualiza um sistema existente
  // Recebe: SistemaApi
  // Retorna: SistemaApi
  app.put('/sistemas/:idSistema', (req, res) => {
    const { idSistema } = req.params;
    const { body } = req;

    // TODO: implementação
    res.status(200).send({ idSistema, ...body });
  });

  // TODO: documentação
  // Remove um sistema existente
  app.delete('/sistemas/:idSistema', (req, res) => {
    const { idSistema } = req.params;

    // TODO: implementação
    res.status(200).send(`Deletar sistema ${idSistema}`);
  });
};
