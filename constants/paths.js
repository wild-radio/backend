import os from 'os';

export const HOME_PATH = os.homedir();
export const BASE_CONFIG_PATH = `${HOME_PATH}/.wildradio/config`;

export default {
  HOME_PATH,
  BASE_CONFIG_PATH,
};
