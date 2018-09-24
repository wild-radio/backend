import date from './date';
import { PORT } from '../constants/network';

const reset = '\x1b[0m';
const clearScreen = '\x1B[2J\x1B[0f';

const font = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

const background = {
  black: '\x1b[40m',
  red: '\x1b[41m',
  green: '\x1b[42m',
  yellow: '\x1b[43m',
  blue: '\x1b[44m',
  magenta: '\x1b[45m',
  cyan: '\x1b[46m',
  white: '\x1b[47m',
};

const formatMethod = method => {
  switch (method) {
    case 'GET':
      return `${font.green}GET\t`;
    case 'POST':
      return `${font.cyan}POST\t`;
    case 'PUT':
      return `${font.blue}PUT\t`;
    case 'DELETE':
      return `${font.red}DELETE\t`;
    case 'OPTIONS':
      return `${font.magenta}OPTIONS\t`;
    default:
      return method;
  }
};

export const clear = () => process.stdout.write(clearScreen);
export const info = message =>
  console.log(`${font.yellow}${date.format(new Date())} |${reset} ${message}`);
export const middleware = (req, res, next) => {
  info(`${formatMethod(req.method)}${reset} http://${req.hostname}:${PORT}${req.path}`);
  next();
};
export default { clear, info, middleware };
