import sqlite3 from 'sqlite3';
import log from '../utils/log';

export const connect = () =>
  new sqlite3.Database('./database/db.sqlite3', err => {
    if (err) {
      log.error(`Erro ao conectar ao banco de dados. ${err}`);
    }
  });

export const test = () =>
  new sqlite3.Database('./database/db.sqlite3', err => {
    if (err) {
      log.error(`Erro ao conectar ao banco de dados. ${err}`);
    } else {
      log.info('Conexão realizada com o banco de dados');
    }
  });

export const getSingleColumn = query =>
  new Promise(resolve => {
    const connection = connect();
    connection.get(query, (err, row) => {
      if (err) {
        log.error(`Erro na consulta ao banco de dados. ${err}`);
      } else {
        resolve(Object.values(row)[0]);
      }
      connection.close();
    });
  });

export const getFirstResult = query =>
  new Promise(resolve => {
    const connection = connect();
    connection.get(query, (err, row) => {
      if (err) {
        log.error(`Erro na consulta ao banco de dados. ${err}`);
      } else {
        resolve(row);
      }
      connection.close();
    });
  });

export const getResultList = query =>
  new Promise(resolve => {
    const connection = connect();
    const resultList = [];
    connection.each(
      query,
      (err, row) => {
        if (err) {
          log.error(`Erro na consulta ao banco de dados. ${err}`);
        } else {
          resultList.push(row);
        }
      },
      err => {
        if (err) {
          log.error(`Erro na consulta ao banco de dados. ${err}`);
        } else {
          resolve(resultList);
        }
        connection.close();
      },
    );
  });

export const execute = query =>
  new Promise(resolve => {
    const connection = connect();
    connection.run(query, err => {
      if (err) {
        log.error(`Erro ao executar comando no banco de dados. ${err}`);
      } else {
        resolve();
      }
    });
  });

export default { connect, test, getSingleColumn, getFirstResult, getResultList, execute };
