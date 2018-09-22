import date from './date';
import { PORT } from '../constants/network';

const formatMethod = method => {
  switch (method) {
    case 'GET':
      return '   GET  ';
    case 'POST':
      return '  POST  ';
    case 'PUT':
      return '   PUT  ';
    case 'DELETE':
      return ' DELETE ';
    default:
      return method;
  }
};
export const clear = () => process.stdout.write('\x1B[2J\x1B[0f');
export const info = message => console.log(`${date.format(new Date())} | ${message}`);
export const middleware = (req, res, next) => {
  info(`[${formatMethod(req.method)}] http://${req.hostname}:${PORT}${req.path}`);
  next();
};
export default { clear, info, middleware };
