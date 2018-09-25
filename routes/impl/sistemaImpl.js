import db from '../../database/db';

export const getSistemas = async (req, res) => {
  const sistemas = await db.getResultList('select * from Sistema');

  const sistemasCameras = await Promise.all(
    sistemas.map(async sistema => {
      const cameras = await db.getResultList(
        `select * from Camera where idSistema = ${sistema.id}`,
      );
      return { ...sistema, cameras };
    }),
  );

  res.status(200).send(sistemasCameras);
};

export const postSistemas = async (req, res) => {
  const { body } = req;
  const { identificacao, numeroSerie } = body;

  if (!identificacao || !numeroSerie) {
    res.status(400).send('Campos obrigatórios devem ser preenchidos');
    return;
  }

  const numeroSerieUtilizado = await db.getSingleColumn(
    `select count(*) from Sistema where numeroSerie = '${numeroSerie}'`,
  );

  if (numeroSerieUtilizado) {
    res.status(400).send(`O sistema com número de série ${numeroSerie} já foi cadastrado`);
    return;
  }

  await db.execute(
    `insert into Sistema
    (identificacao, numeroSerie)
    values
    ('${identificacao}', '${numeroSerie}')`,
  );
  const sistemaCadastrado = await db.getFirstResult('select * from Sistema order by id desc');

  await db.execute(`insert into Camera (idSistema, principal) values (${sistemaCadastrado.id}, 0)`);
  await db.execute(`insert into Camera (idSistema, principal) values (${sistemaCadastrado.id}, 1)`);

  const camerasCadastradas = await db.getResultList(
    `select * from Camera where idSistema = ${sistemaCadastrado.id}`,
  );

  res.status(200).send({ ...sistemaCadastrado, cameras: camerasCadastradas });
};
