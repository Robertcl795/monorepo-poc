import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type RemoteName = 'editor' | 'conv' | 'vs' | null;

interface RemoteState {
  current: RemoteName;
}

export const RemoteStore = signalStore(
  { providedIn: 'root' },
  withState<RemoteState>({ current: null }),
  withMethods((store) => ({
    setRemote(current: RemoteName) {
      patchState(store, { current });
    },
  })),
);

export type RemoteStoreInstance = InstanceType<typeof RemoteStore>;
