import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

type NavItem = {
  key: string;
  label: string;
  icon?: string;
  description?: string;
};

@Component({
  selector: 'rc-cv-app-shell',
  standalone: true,
  imports: [
    NgIf,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <mat-sidenav-container class="cv-shell" [class.contained]="contained()">
      <mat-sidenav
        mode="side"
        [opened]="opened()"
        class="cv-shell__nav"
        [fixedInViewport]="false"
        (openedChange)="opened.set($event)"
      >
        <div class="cv-shell__logo">
          <ng-content select="[logo]"></ng-content>
        </div>
        <mat-nav-list>
          @for (item of navItems(); track item.key) {
            <a
              mat-list-item
              (click)="onNavigate(item.key)"
              [class.active]="item.key === activeKey()"
            >
              <mat-icon aria-hidden="true" *ngIf="item.icon">{{ item.icon }}</mat-icon>
              <div class="cv-shell__nav-text">
                <span class="cv-shell__nav-label">{{ item.label }}</span>
                <span class="cv-shell__nav-desc" *ngIf="item.description">{{
                  item.description
                }}</span>
              </div>
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="cv-shell__toolbar">
          <button mat-icon-button type="button" (click)="toggleNav()">
            <mat-icon>menu</mat-icon>
          </button>
          <div class="cv-shell__titles">
            <div class="cv-shell__app">{{ appName() }}</div>
            <div class="cv-shell__section">{{ sectionName() }}</div>
          </div>
          <span class="spacer"></span>
          <ng-content select="[toolbar-actions]"></ng-content>
          <!-- Example Material Web hook -->
          <md-icon-button aria-label="user menu" hidden></md-icon-button>
        </mat-toolbar>

        <div class="cv-shell__content">
          <ng-content></ng-content>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    .cv-shell {
      height: 100vh;
      background: var(--rc-bg);
      color: var(--rc-text);
    }
    .cv-shell.contained {
      border: 1px solid var(--rc-border);
      border-radius: 12px;
      overflow: hidden;
    }
    .cv-shell__nav {
      width: 240px;
      background: var(--rc-surface);
      border-right: 1px solid var(--rc-border);
      color: var(--rc-text);
    }
    .cv-shell__logo {
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cv-shell__toolbar {
      backdrop-filter: blur(6px);
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
    a.mat-mdc-list-item.active {
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
