import camera from './camera';
import catalogo from './catalogo';
import sistema from './sistema';

export default app => {
  camera(app);
  catalogo(app);
  sistema(app);
};
