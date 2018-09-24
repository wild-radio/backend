import ip from 'ip';

export const PORT = 8080;
export const URL = `${ip.address()}:${PORT}`;
export const SWAGGER_UI = '/swagger';

export default { PORT, URL, SWAGGER_UI };
