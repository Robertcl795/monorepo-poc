import { initFederation } from '@angular-architects/native-federation';
import { registerMaterialWeb } from '@rocker-code/shared';

registerMaterialWeb();
initFederation('federation.manifest.json')
  .catch((err) => console.error(err))
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
