import ip from 'ip';

export const PORT = 8080;
export const URL = `${ip.address()}:${PORT}`;
export const WS_PORT = 9090;
export const WS_URL = `${ip.address()}:${WS_PORT}`;
export const SWAGGER_UI = '/swagger';

export default { PORT, URL, WS_PORT, WS_URL, SWAGGER_UI };
