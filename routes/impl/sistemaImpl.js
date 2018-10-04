import { transaction } from '../../database/db';

export const getSistemas = async (req, res) => {
  const sistemas = await transaction.getResultList('select * from Sistema');

  const sistemasCameras = await Promise.all(
    sistemas.map(async sistema => {
      let cameras = await transaction.getResultList(
        `select * from Camera where idSistema = ${sistema.id}`,
      );

      cameras = await Promise.all(
        cameras.map(async camera => {
          const fotosNovas = await transaction.getSingleColumn(
            `select count(*) from Foto where idCamera = ${camera.id} and idCatalogo is null`,
          );
          const ativa = await transaction.getSingleColumn(
            `select ativa from Configuracao where idCamera = ${camera.id}`,
          );
          return { ...camera, fotosNovas, ativa: !!ativa };
        }),
      );

      return { ...sistema, cameras };
    }),
  );

  return res.status(200).send(sistemasCameras);
};

export const postSistemas = async (req, res) => {
  const { body } = req;
  const { identificacao, numeroSerie } = body;

  if (!identificacao || !numeroSerie) {
    return res.status(400).send('Campos obrigatórios devem ser preenchidos');
  }

  const numeroSerieUtilizado = await transaction.getSingleColumn(
    `select count(*) from Sistema where numeroSerie = '${numeroSerie}'`,
  );

  if (numeroSerieUtilizado) {
    return res.status(400).send(`O sistema com número de série ${numeroSerie} já foi cadastrado`);
  }

  await transaction.execute(
    `insert into Sistema (identificacao, numeroSerie)
    values ('${identificacao}', '${numeroSerie}')`,
  );

  const sistemaCadastrado = await transaction.getFirstResult(
    'select * from Sistema order by id desc',
  );

  await transaction.execute(
    `insert into Camera (idSistema, principal)
    values (${sistemaCadastrado.id}, 1)`,
  );

  const idCameraPrincipal = await transaction.getSingleColumn(
    'select id from Camera order by id desc',
  );

  await transaction.execute(
    `insert into Configuracao
    (idCamera, ativa, temporizador, presenca, horizontal, vertical)
    values (${idCameraPrincipal}, 0, 0, 0, 0, 0);
    `,
  );

  await transaction.execute(
    `insert into Camera
    (idSistema, principal)
    values (${sistemaCadastrado.id}, 0)`,
  );

  const idCameraAlternativa = await transaction.getSingleColumn(
    'select id from Camera order by id desc',
  );

  await transaction.execute(
    `insert into Configuracao
    (idCamera, ativa, temporizador, presenca, horizontal, vertical)
    values (${idCameraAlternativa}, 0, 0, 0, 0, 0);
    `,
  );

  const camerasCadastradas = await transaction.getResultList(
    `select * from Camera where idSistema = ${sistemaCadastrado.id}`,
  );

  return res.status(200).send({ ...sistemaCadastrado, cameras: camerasCadastradas });
};
