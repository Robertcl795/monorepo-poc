import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';

import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { getTestBed } from '@angular/core/testing';

@NgModule({
  providers: [provideExperimentalZonelessChangeDetection()],
})
class ZonelessTestModule {}

getTestBed().initTestEnvironment(
  [BrowserTestingModule, ZonelessTestModule],
  platformBrowserTesting(),
);
