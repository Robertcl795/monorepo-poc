import { loadRemoteModule } from '@angular-architects/native-federation';
import type { Routes } from '@angular/router';
import { REMOTE_REGISTRY } from './remote-registry';

export function buildRoutes(): Routes {
  const remoteRoutes: Routes = REMOTE_REGISTRY.map((remote) => ({
    path: remote.routePath,
    loadChildren: () =>
      loadRemoteModule<{ REMOTE_ROUTES: Routes }>(remote.key, remote.exposedRoutes).then(
        (m) => m.REMOTE_ROUTES ?? [],
      ),
  }));

  return [
    ...remoteRoutes,
    { path: '', pathMatch: 'full', redirectTo: REMOTE_REGISTRY[0]?.routePath ?? '' },
    { path: '**', redirectTo: REMOTE_REGISTRY[0]?.routePath ?? '' },
  ];
}
