export default app => {
  app.get('/sistemas', (req, res) => {
    // TODO: implementação
    res.status(200).send(`GET sistemas`);
  });
};
