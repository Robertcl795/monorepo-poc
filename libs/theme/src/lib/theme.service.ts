import { Injectable, NgZone, effect, signal } from '@angular/core';

export type RcTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly activeTheme = signal<RcTheme>('light');

  readonly themeClass = this.activeTheme.asReadonly();

  constructor(zone: NgZone) {
    effect(() => {
      const theme = this.activeTheme();
      zone.runOutsideAngular(() => {
        const root = document.documentElement;
        root.classList.remove('rc-theme-light', 'rc-theme-dark');
        root.classList.add(`rc-theme-${theme}`);
      });
    });
  }

  toggle(): void {
    this.setTheme(this.activeTheme() === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: RcTheme): void {
    this.activeTheme.set(theme);
  }
}
