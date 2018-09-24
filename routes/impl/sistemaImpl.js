export const getSistemas = (req, res) => {
  // TODO: implementação
  res.status(200).send('GET sistemas');
};

export const postSistemas = (req, res) => {
  const { body } = req;

  // TODO: implementação
  res.status(200).send({ ...body });
};
