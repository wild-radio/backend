import { transaction } from '../../database/db';
import log from '../../utils/log';

export const getSistemas = async (req, res) => {
  try {
    const sistemas = await transaction.getResultList('select * from Sistema');

    const sistemasCameras = await Promise.all(
      sistemas.map(async sistema => {
        const cameras = await transaction.getResultList(
          `select * from Camera where idSistema = ${sistema.id}`,
        );
        return { ...sistema, cameras };
      }),
    );

    res.status(200).send(sistemasCameras);
  } catch (err) {
    log.error(err);
    res.status(500).send('Erro interno');
  }
};

export const postSistemas = async (req, res) => {
  try {
    const { body } = req;
    const { identificacao, numeroSerie } = body;

    if (!identificacao || !numeroSerie) {
      return res.status(400).send('Campos obrigatórios devem ser preenchidos');
    }

    const numeroSerieUtilizado = await transaction.getSingleColumn(
      `select count(*) from Sistema where numeroSerie = '${numeroSerie}'`,
    );

    if (numeroSerieUtilizado) {
      res.status(400).send(`O sistema com número de série ${numeroSerie} já foi cadastrado`);
      return;
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
       values (${sistemaCadastrado.id}, 0)`,
    );

    await transaction.execute(
      `insert into Camera (idSistema, principal)
       values (${sistemaCadastrado.id}, 1)`,
    );

    const camerasCadastradas = await transaction.getResultList(
      `select * from Camera where idSistema = ${sistemaCadastrado.id}`,
    );

    res.status(200).send({ ...sistemaCadastrado, cameras: camerasCadastradas });
  } catch (err) {
    log.error(err);
    res.status(500).send('Erro interno');
  }
};
