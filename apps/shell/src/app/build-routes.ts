import { loadRemoteModule } from '@angular-architects/native-federation';
import type { Routes } from '@angular/router';

export async function buildRoutes(): Promise<Routes> {
  const manifestResponse = await fetch('federation.manifest.json');
  if (!manifestResponse.ok) {
    throw new Error('Unable to load federation manifest');
  }

  const manifest = (await manifestResponse.json()) as Record<string, string>;
  const names = Object.keys(manifest);

  const remoteRoutes: Routes = names.map((remote) => ({
    path: remote,
    loadChildren: () =>
      loadRemoteModule<{ REMOTE_ROUTES: Routes }>(remote, './routes').then(
        (m) => m.REMOTE_ROUTES ?? [],
      ),
  }));

  return [
    ...remoteRoutes,
    { path: '', pathMatch: 'full', redirectTo: 'editor' },
    { path: '**', redirectTo: 'editor' },
  ];
}
