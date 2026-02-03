import { RemoteName } from '@rocker-code/shared';

export type RemoteRegistryEntry = {
  key: Exclude<RemoteName, null>;
  label: string;
  description: string;
  icon: string;
  routePath: string;
  exposedRoutes: string;
  url: string;
};

export const REMOTE_REGISTRY: RemoteRegistryEntry[] = [
  {
    key: 'editor',
    label: 'Editor',
    description: 'Notes & ideation space',
    icon: 'edit',
    routePath: 'editor',
    exposedRoutes: './routes',
    url: 'http://localhost:4201/remoteEntry.json',
  },
  {
    key: 'conv',
    label: 'Conv',
    description: 'Centered chat placeholder',
    icon: 'chat',
    routePath: 'conv',
    exposedRoutes: './routes',
    url: 'http://localhost:4202/remoteEntry.json',
  },
  {
    key: 'vs',
    label: 'VS',
    description: 'Layout-only skeleton',
    icon: 'dashboard',
    routePath: 'vs',
    exposedRoutes: './routes',
    url: 'http://localhost:4203/remoteEntry.json',
  },
];
