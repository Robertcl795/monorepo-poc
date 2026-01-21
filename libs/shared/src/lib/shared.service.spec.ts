import { TestBed } from '@angular/core/testing';

import { RemoteStore, RemoteStoreInstance } from './shared.service';

describe('RemoteStore', () => {
  let store: RemoteStoreInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(RemoteStore);
  });

  it('initializes without a remote', () => {
    expect(store.current()).toBeNull();
  });

  it('sets the current remote', () => {
    store.setRemote('editor');
    expect(store.current()).toBe('editor');
  });
});
