import sqlite3 from 'sqlite3';
import log from '../utils/log';

class Transaction {
  constructor() {
    this.connection = null;
    this.transactionActive = false;
  }

  open() {
    this.connection = new sqlite3.Database('./database/db.sqlite3', err => {
      if (err) {
        throw new Error(`Erro ao conectar ao banco de dados. ${err}`);
      }
    });
    this.transactionActive = false;
  }

  begin() {
    if (!this.transactionActive) {
      return new Promise((resolve, reject) =>
        this.connection.run('begin transaction', err => {
          if (err) {
            reject(new Error(`Erro ao iniciar transação no banco de dados. ${err}`));
          } else {
            this.transactionActive = true;
            resolve();
          }
        }),
      );
    }
  }

  commit() {
    if (this.transactionActive) {
      return new Promise((resolve, reject) =>
        this.connection.run('commit', err => {
          if (err) {
            reject(new Error(`Erro ao cometer transação no banco de dados. ${err}`));
          } else {
            this.transactionActive = false;
            resolve();
          }
        }),
      );
    }
  }

  rollback() {
    if (this.transactionActive) {
      return new Promise((resolve, reject) =>
        this.connection.run('rollback', err => {
          if (err) {
            reject(new Error(`Erro no rollback de transação no banco de dados. ${err}`));
          } else {
            this.transactionActive = false;
            resolve();
          }
        }),
      );
    }
  }

  execute(query) {
    return new Promise((resolve, reject) =>
      this.connection.run(query, err => {
        if (err) {
          reject(new Error(`Erro ao executar comando no banco de dados. ${err}`));
        } else {
          resolve();
        }
      }),
    );
  }

  getSingleColumn(query) {
    return new Promise(async (resolve, reject) => {
      this.connection.get(query, (err, row) => {
        if (err) {
          reject(new Error(`Erro na consulta ao banco de dados. ${err}`));
        } else if (typeof row === 'object') {
          resolve(Object.values(row)[0]);
        } else {
          resolve();
        }
      });
    });
  }

  getFirstResult(query) {
    return new Promise((resolve, reject) => {
      this.connection.get(query, (err, row) => {
        if (err) {
          reject(new Error(`Erro na consulta ao banco de dados. ${err}`));
        } else {
          resolve(row);
        }
      });
    });
  }

  getResultList(query) {
    return new Promise((resolve, reject) => {
      const resultList = [];
      this.connection.each(
        query,
        (err, row) => {
          if (err) {
            reject(new Error(`Erro na consulta ao banco de dados. ${err}`));
          } else {
            resultList.push(row);
          }
        },
        err => {
          if (err) {
            reject(new Error(`Erro na consulta ao banco de dados. ${err}`));
          } else {
            resolve(resultList);
          }
        },
      );
    });
  }

  close() {
    return this.connection.close();
  }
}

export const transaction = new Transaction();

export const test = async () =>
  new sqlite3.Database('./database/db.sqlite3', err => {
    if (err) {
      log.error(`Erro ao conectar ao banco de dados. ${err}`);
    } else {
      log.info('Conexão realizada com o banco de dados');
    }
  });

export const transactionManager = (req, res, next) => {
  const originalSend = res.send;

  transaction.open();
  transaction.begin();

  res.send = response => {
    if (res.statusCode !== 200) {
      transaction.rollback();
    } else {
      transaction.commit();
    }
    transaction.close();
    res.send = originalSend;
    res.send(response);
  };

  next();
};

export default {
  transaction,
  test,
  transactionManager,
};
