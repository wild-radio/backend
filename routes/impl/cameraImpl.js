import webSocketServer from '../../websocket';
import log from '../../utils/log';
import file from '../../utils/file';
import PATHS from '../../constants/paths';

export const getConfiguracao = async (req, res) => {
  const { idCamera } = req.params;

  const camera = await req.transaction.getSingleColumn(
    `select count(*) from Camera where id = ${idCamera}`,
  );

  if (!camera) {
    return res.status(404).send('Câmera não encontrada');
  }

  const configuracao = await req.transaction.getFirstResult(
    `select * from Configuracao where idCamera = ${idCamera}`,
  );

  return res.status(200).send(configuracao);
};

export const putConfiguracao = async (req, res) => {
  const { idCamera } = req.params;
  const { body } = req;
  const { ativa, temporizador, presenca, horizontal, vertical } = body;
  const fotoConfirmacao = 0;

  const preenchidoBooleano = configuracao => configuracao === 0 || configuracao === 1;
  const preenchidoNumerico = configuracao => configuracao || configuracao === 0;

  if (
    !preenchidoBooleano(ativa) ||
    !preenchidoBooleano(temporizador) ||
    !preenchidoBooleano(presenca) ||
    !preenchidoNumerico(horizontal) ||
    !preenchidoNumerico(vertical)
  ) {
    return res.status(400).send('Campos obrigatórios devem ser preenchidos');
  }

  const camera = await req.transaction.getFirstResult(
    `select * from Camera where id = ${idCamera}`,
  );

  if (!camera) {
    return res.status(404).send('Câmera não encontrada');
  }

  const numeroSerie = await req.transaction.getSingleColumn(
    `select numeroSerie from Sistema where id = ${camera.idSistema}`,
  );
  const principal = camera.principal === 1 ? 'principal' : 'alternativa';
  const configuracao = await req.transaction.getFirstResult(
    `select * from Configuracao where idCamera = ${idCamera}`,
  );

  await req.transaction.execute(
    `update Configuracao set
    ativa=${ativa},
    temporizador=${temporizador},
    presenca=${presenca},
    horizontal=${horizontal},
    vertical=${vertical}
    where idCamera = ${idCamera}`,
  );

  file.atualizar(
    `${PATHS.BASE_CONFIG_PATH}/${numeroSerie}/${principal}`,
    `${ativa}\n${temporizador}\n${presenca}\n${horizontal}\n${vertical}\n${fotoConfirmacao}`,
  );
  log.info(`Arquivo de configuração da câmera ${idCamera} atualizado`);

  res.status(200).send({ ...configuracao, ativa, temporizador, presenca, horizontal, vertical });
};

export const postConfirmacaoConfiguracao = async (req, res) => {
  const { idCamera } = req.params;
  const { body } = req;
  const { ativa, temporizador, presenca, horizontal, vertical } = body;
  const fotoConfirmacao = 1;

  const preenchidoBooleano = configuracao => configuracao === 0 || configuracao === 1;
  const preenchidoNumerico = configuracao => configuracao || configuracao === 0;

  if (
    !preenchidoBooleano(ativa) ||
    !preenchidoBooleano(temporizador) ||
    !preenchidoBooleano(presenca) ||
    !preenchidoNumerico(horizontal) ||
    !preenchidoNumerico(vertical)
  ) {
    return res.status(400).send('Campos obrigatórios devem ser preenchidos');
  }

  const camera = await req.transaction.getFirstResult(
    `select * from Camera where id = ${idCamera}`,
  );

  if (!camera) {
    return res.status(404).send('Câmera não encontrada');
  }

  const numeroSerie = await req.transaction.getSingleColumn(
    `select numeroSerie from Sistema where id = ${camera.idSistema}`,
  );
  const principal = camera.principal === 1 ? 'principal' : 'alternativa';

  file.atualizar(
    `${PATHS.BASE_CONFIG_PATH}/${numeroSerie}/${principal}`,
    `${ativa}\n${temporizador}\n${presenca}\n${horizontal}\n${vertical}\n${fotoConfirmacao}`,
  );
  log.info(`Arquivo de configuração da câmera ${idCamera} atualizado para confirmação`);

  res.status(200).send();
};

export const getFotos = async (req, res) => {
  const { idCamera } = req.params;

  const camera = await req.transaction.getSingleColumn(
    `select count(*) from Camera where id = ${idCamera}`,
  );

  if (!camera) {
    return res.status(404).send('Câmera não encontrada');
  }

  const fotos = await req.transaction.getResultList(
    `select * from Foto where idCamera = ${idCamera} and idCatalogo is null`,
  );

  return res.status(200).send(fotos);
};

export const deleteFotos = async (req, res) => {
  const { idCamera, idFoto } = req.params;

  const camera = await req.transaction.getSingleColumn(
    `select count(*) from Camera where id = ${idCamera}`,
  );

  if (!camera) {
    return res.status(404).send('Câmera não encontrada');
  }

  const foto = await req.transaction.getFirstResult(
    `select * from Foto
    where id = ${idFoto}
    and idCamera = ${idCamera}`,
  );

  if (!foto) {
    return res.status(404).send('Foto não encontrada');
  }

  if (foto.idCatalogo) {
    return res.status(400).send('A foto informada já está catalogada');
  }

  await req.transaction.execute(`
    delete from Foto
    where id = ${idFoto}
    and idCamera = ${idCamera}
    and idCatalogo is null
  `);

  return res.status(200).send();
};

export const postFotos = async (req, res) => {
  const { numeroSerial, tipoCamera } = req.params;
  const { body } = req;
  const { dataHoraCaptura, conteudo } = body;

  if (!(tipoCamera === 'principal' || tipoCamera === 'alternativa')) {
    return res.status(400).send("O tipo da câmera deve ser 'principal' ou 'alternativa'");
  }

  if (!dataHoraCaptura || !conteudo) {
    return res.status(400).send('Campos obrigatórios devem ser preenchidos');
  }

  const idCamera = await req.transaction.getSingleColumn(
    `select c.id from Sistema s
    join Camera c on s.id = c.idSistema
    where s.numeroSerie = '${numeroSerial}' and principal = ${tipoCamera === 'principal' ? 1 : 0}`,
  );

  if (!idCamera) {
    return res.status(404).send('Câmera não encontrada');
  }

  await req.transaction.execute(
    `insert into Foto
    (idCamera, idCatalogo, dataHoraCaptura, conteudo)
    values (${idCamera}, null, ${dataHoraCaptura}, '${conteudo}')`,
  );

  res.status(200).send();
};

export const postFotoConfirmacaoConfiguracao = async (req, res) => {
  const { numeroSerial, tipoCamera } = req.params;
  const { body } = req;
  const { dataHoraCaptura, conteudo } = body;

  if (!(tipoCamera === 'principal' || tipoCamera === 'alternativa')) {
    return res.status(400).send("O tipo da câmera deve ser 'principal' ou 'alternativa'");
  }

  if (!dataHoraCaptura || !conteudo) {
    return res.status(400).send('Campos obrigatórios devem ser preenchidos');
  }

  const idCamera = await req.transaction.getSingleColumn(
    `select c.id from Sistema s
    join Camera c on s.id = c.idSistema
    where s.numeroSerie = '${numeroSerial}' and principal = ${tipoCamera === 'principal' ? 1 : 0}`,
  );

  if (!idCamera) {
    return res.status(404).send('Câmera não encontrada');
  }

  webSocketServer.notify(idCamera, conteudo);

  res.status(200).send();
};
