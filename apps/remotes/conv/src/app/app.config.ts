import { DOCUMENT } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

import { REMOTE_ROUTES } from './remote.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    { provide: DOCUMENT, useValue: document },
    provideRouter(REMOTE_ROUTES, withEnabledBlockingInitialNavigation()),
  ],
};
