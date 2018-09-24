export const getCatalogos = (req, res) => {
  // TODO: implementação
  res.status(200).send('GET catálogos');
};

export const postCatalogos = (req, res) => {
  const { body } = req;

  // TODO: implementação
  res.status(200).send(body);
};

export const putCatalogos = (req, res) => {
  const { idCatalogo } = req.params;
  const { body } = req;

  // TODO: implementação
  res.status(200).send({ idCatalogo, ...body });
};

export const deleteCatalogos = (req, res) => {
  const { idCatalogo } = req.params;

  // TODO: implementação
  res.status(200).send(`DELETE catálogo ${idCatalogo}`);
};

export const getFotos = (req, res) => {
  const { idCatalogo } = req.params;

  // TODO: implementação
  res.status(200).send(`GET fotos catálogo ${idCatalogo}`);
};

export const putFotos = (req, res) => {
  const { idCatalogo, idFoto } = req.params;

  // TODO: implementação
  res.status(200).send(`PUT foto ${idFoto} ao catálogo ${idCatalogo}`);
};

export const deleteFotos = (req, res) => {
  const { idCatalogo, idFoto } = req.params;

  // TODO: implementação
  res.status(200).send(`DELETE foto ${idFoto} do catálogo ${idCatalogo}`);
};

export const putTransferirFotos = (req, res) => {
  const { idCatalogoOrigem, idCatalogoDestino } = req.params;

  // TODO: implementação
  res.status(200).send(`Transferir fotos de ${idCatalogoOrigem} para ${idCatalogoDestino}`);
};
