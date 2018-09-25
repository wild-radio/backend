import camera from './camera';
import catalogo from './catalogo';
import sistema from './sistema';

export default server => {
  camera(server);
  catalogo(server);
  sistema(server);
};
