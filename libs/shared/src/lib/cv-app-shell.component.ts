import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output, signal } from '@angular/core';
import { NgIf } from '@angular/common';

export type NavItem = {
  key: string;
  label: string;
  icon?: string;
  description?: string;
};

@Component({
  selector: 'rc-cv-app-shell',
  standalone: true,
  imports: [NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="cv-shell" [class.contained]="contained()">
      <aside class="cv-shell__nav" [class.is-open]="opened()">
        <div class="cv-shell__logo">
          <ng-content select="[logo]"></ng-content>
        </div>
        <md-list class="cv-shell__list">
          @for (item of navItems(); track item.key) {
            <md-list-item (click)="onNavigate(item.key)" [class.active]="item.key === activeKey()">
              <md-icon slot="start" aria-hidden="true" *ngIf="item.icon">{{ item.icon }}</md-icon>
              <div class="cv-shell__nav-text">
                <span class="cv-shell__nav-label">{{ item.label }}</span>
                <span class="cv-shell__nav-desc" *ngIf="item.description">{{
                  item.description
                }}</span>
              </div>
            </md-list-item>
          }
        </md-list>
      </aside>

      <section class="cv-shell__main">
        <header class="cv-shell__toolbar">
          <md-icon-button type="button" aria-label="Toggle navigation" (click)="toggleNav()">
            <md-icon>menu</md-icon>
          </md-icon-button>
          <div class="cv-shell__titles">
            <div class="cv-shell__app">{{ appName() }}</div>
            <div class="cv-shell__section">{{ sectionName() }}</div>
          </div>
          <span class="spacer"></span>
          <ng-content select="[toolbar-actions]"></ng-content>
        </header>

        <div class="cv-shell__content">
          <ng-content></ng-content>
        </div>
      </section>
    </div>
  `,
  styles: `
    .cv-shell {
      height: 100vh;
      background: var(--rc-bg);
      color: var(--rc-text);
      display: grid;
      grid-template-columns: 240px 1fr;
    }
    .cv-shell.contained {
      border: 1px solid var(--rc-border);
      border-radius: 12px;
      overflow: hidden;
    }
    .cv-shell__nav {
      background: var(--rc-surface);
      border-right: 1px solid var(--rc-border);
      color: var(--rc-text);
      padding: 0.75rem 0.5rem;
      transition: transform 150ms ease;
    }
    .cv-shell__nav.is-open {
      transform: translateX(0);
    }
    .cv-shell__list {
      background: transparent;
    }
    .cv-shell__logo {
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cv-shell__main {
      display: grid;
      grid-template-rows: auto 1fr;
    }
    .cv-shell__toolbar {
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.25rem;
      border-bottom: 1px solid var(--rc-border);
      background: var(--rc-surface);
    }
    .cv-shell__titles {
      display: grid;
      gap: 2px;
      margin-left: 0.5rem;
    }
    .cv-shell__app {
      font-weight: 700;
    }
    .cv-shell__section {
      font-size: 0.85rem;
      color: var(--rc-muted);
    }
    .spacer {
      flex: 1;
    }
    .cv-shell__content {
      padding: 1.25rem;
      background: var(--rc-bg);
      color: var(--rc-text);
      min-height: calc(100vh - 64px);
    }
    md-list-item.active {
      border: 1px solid var(--rc-accent);
      border-radius: 10px;
    }
    .cv-shell__nav-text {
      display: grid;
      gap: 2px;
    }
    .cv-shell__nav-label {
      font-weight: 600;
    }
    .cv-shell__nav-desc {
      font-size: 0.85rem;
      color: var(--rc-muted);
    }
  `,
})
export class CvAppShellComponent {
  appName = input<string>('Rocker Code');
  sectionName = input<string>('Micro frontends lab');
  navItems = input<NavItem[]>([]);
  activeKey = input<string | null>(null);
  contained = input<boolean>(false);
  opened = signal<boolean>(true);

  navigate = output<string>();

  onNavigate(key: string): void {
    this.navigate.emit(key);
  }

  toggleNav(): void {
    this.opened.update((v) => !v);
  }
}
