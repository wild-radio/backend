export const getConfiguracao = (req, res) => {
  const { idCamera } = req.params;

  // TODO: implementação
  res.status(200).send(`GET configuração camera ${idCamera}`);
};

export const putConfiguracao = (req, res) => {
  const { idCamera } = req.params;
  const { body } = req;

  // TODO: implementação
  // (Atualizar o arquivo de configuração)
  res.status(200).send({ idCamera, ...body });
};

export const postConfirmacaoConfiguracao = (req, res) => {
  const { idCamera } = req.params;

  // TODO: implementação
  // (Atualizar o arquivo de configuração, mas não o banco)
  // (Abrir um websocket e esperar a chegada da foto)
  res.status(200).send(`Websocket ${idCamera}`);
};

export const postFotoConfirmacaoConfiguracao = (req, res) => {
  const { idCamera } = req.params;

  // TODO: implementação
  // (Enviar foto recebida pelo websocket)
  res.status(200).send(`Websocket ${idCamera}`);
};

export const getFotos = (req, res) => {
  const { idCamera } = req.params;

  // TODO: implementação
  res.status(200).send(`GET fotos camera ${idCamera}`);
};

export const postFotos = (req, res) => {
  const { idCamera } = req.params;
  const { body } = req;

  // TODO: implementação
  res.status(200).send({ idCamera, ...body });
};

export const deleteFotos = (req, res) => {
  const { idCamera, idFoto } = req.params;

  // TODO: implementação
  res.status(200).send(`DELETE foto ${idFoto} da câmera ${idCamera}`);
};
