import { Component, computed, input, output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

type NavItem = {
  key: string;
  label: string;
  icon?: string;
  description?: string;
};

@Component({
  selector: 'rc-cv-app-shell',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <div class="cv-shell" [class.contained]="contained()">
      <header class="cv-shell__header">
        <div class="cv-shell__brand">
          <div class="cv-shell__logo">
            <ng-content select="[logo]"></ng-content>
          </div>
          <div>
            <div class="cv-shell__app">{{ appName() }}</div>
            <div class="cv-shell__section">{{ sectionName() }}</div>
          </div>
        </div>
        <div class="cv-shell__section-action">
          <ng-content select="[section-action]"></ng-content>
        </div>
        <div class="cv-shell__user-menu">
          <ng-content select="[user-menu]"></ng-content>
        </div>
      </header>

      <div class="cv-shell__body" [class.open]="open() || forcedOpen()">
        <aside class="cv-shell__nav" aria-label="Application navigation">
          <ng-content select="[navigation]"></ng-content>

          <ng-container *ngIf="hasNav()">
            @for (item of navItems(); track item.key) {
              <button
                type="button"
                class="cv-shell__nav-item"
                [class.active]="item.key === activeKey()"
                (click)="onNavigate(item.key)"
              >
                <span class="material-symbols-outlined" *ngIf="item.icon">{{ item.icon }}</span>
                <div class="cv-shell__nav-text">
                  <span class="cv-shell__nav-label">{{ item.label }}</span>
                  <span class="cv-shell__nav-desc" *ngIf="item.description">{{
                    item.description
                  }}</span>
                </div>
              </button>
            }
          </ng-container>
        </aside>

        <main class="cv-shell__content">
          <div class="cv-shell__tabs">
            <ng-content select="[tab-bar]"></ng-content>
          </div>
          <ng-content></ng-content>
        </main>
      </div>
    </div>
  `,
  styles: `
    .cv-shell {
      display: grid;
      grid-template-rows: auto 1fr;
      min-height: 100vh;
      background: var(--rc-bg);
      color: var(--rc-text);
    }
    .cv-shell.contained {
      border: 1px solid var(--rc-border);
      border-radius: 16px;
      overflow: hidden;
    }
    .cv-shell__header {
      display: grid;
      grid-template-columns: 1fr auto auto;
      align-items: center;
      gap: 1rem;
      padding: 0.9rem 1.25rem;
      border-bottom: 1px solid var(--rc-border);
      background: linear-gradient(120deg, var(--rc-surface), var(--rc-surface-strong));
    }
    .cv-shell__brand {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      min-width: 0;
    }
    .cv-shell__logo {
      width: 120px;
      display: inline-flex;
      align-items: center;
    }
    .cv-shell__app {
      font-weight: 700;
      letter-spacing: 0.01em;
    }
    .cv-shell__section {
      color: var(--rc-muted);
      font-size: 0.9rem;
    }
    .cv-shell__section-action,
    .cv-shell__user-menu {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: flex-end;
    }
    .cv-shell__body {
      display: grid;
      grid-template-columns: 260px 1fr;
      min-height: 0;
    }
    .cv-shell__nav {
      padding: 1.1rem 1rem;
      border-right: 1px solid var(--rc-border);
      background: linear-gradient(180deg, var(--rc-surface), rgb(17 24 40 / 90%));
      display: grid;
      gap: 0.35rem;
    }
    .cv-shell__nav-item {
      all: unset;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      gap: 0.65rem;
      padding: 0.75rem 0.9rem;
      border-radius: 12px;
      border: 1px solid transparent;
      transition:
        border-color 120ms ease,
        background 120ms ease,
        transform 120ms ease;
    }
    .cv-shell__nav-item:hover {
      background: var(--rc-surface-strong);
      border-color: var(--rc-border);
    }
    .cv-shell__nav-item.active {
      border-color: var(--rc-accent);
      background: linear-gradient(120deg, var(--rc-surface-strong), var(--rc-surface));
      transform: translateY(-1px);
    }
    .cv-shell__nav-text {
      display: grid;
      gap: 0.15rem;
    }
    .cv-shell__nav-label {
      font-weight: 600;
      letter-spacing: 0.01em;
    }
    .cv-shell__nav-desc {
      color: var(--rc-muted);
      font-size: 0.85rem;
    }
    .cv-shell__content {
      padding: 1.25rem 1.5rem;
      min-height: 0;
      display: grid;
      gap: 0.75rem;
      background: var(--rc-bg);
    }
    .cv-shell__tabs {
      border-bottom: 1px solid var(--rc-border);
      padding-bottom: 0.5rem;
    }
  `,
})
export class CvAppShellComponent {
  appName = input<string>('Rocker Code');
  sectionName = input<string>('Micro frontends lab');
  navItems = input<NavItem[]>([]);
  activeKey = input<string | null>(null);
  contained = input<boolean>(false);
  forcedOpen = input<boolean>(false);
  open = input<boolean>(true);

  navigate = output<string>();

  readonly hasNav = computed(() => this.navItems().length > 0);

  onNavigate(key: string): void {
    this.navigate.emit(key);
  }
}
