import { DOCUMENT } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

export const appConfig = (routes: Routes): ApplicationConfig => ({
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    { provide: DOCUMENT, useValue: document },
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
  ],
});
