import path from 'path';
import fs from 'fs';

export const criaDiretorioSeNecessario = filePath => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  criaDiretorioSeNecessario(dirname);
  fs.mkdirSync(dirname);
};

export const atualizar = (filePath, data) => {
  criaDiretorioSeNecessario(filePath);

  fs.writeFile(filePath, data, { flag: 'w' }, err => {
    if (err) {
      throw err;
    }
  });
};

export default { criaDiretorioSeNecessario, atualizar };
