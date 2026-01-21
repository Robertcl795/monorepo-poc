import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Routes, provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

export const appConfig = (routes: Routes): ApplicationConfig => ({
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
  ],
});
