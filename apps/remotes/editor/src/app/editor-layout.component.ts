import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RcButtonComponent } from '@rocker-code/shared';

@Component({
  selector: 'app-editor-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RcButtonComponent],
  template: `
    <div class="editor-shell">
      <div class="editor-header">
        <div>
          <p class="badge" style="margin: 0">Editor Remote</p>
          <h2 class="rc-title" style="margin: 0.25rem 0 0">Signal-based workspace</h2>
          <p class="rc-subtle" style="margin: 0">Tabs are pure router links so deep links work.</p>
        </div>
        <rc-button [accent]="true" [label]="'Share note'" />
      </div>

      <div class="tab-bar">
        @for (tab of tabs; track tab.path) {
          <a class="tab-chip" [routerLink]="[tab.path]" routerLinkActive="active">{{
            tab.label
          }}</a>
        }
      </div>

      <div class="editor-body">
        <section class="editor-pane">
          <router-outlet />
        </section>
        <section class="editor-pane">
          <h3 style="margin-top: 0">Scratchpad</h3>
          <p class="rc-subtle">Quick ideas, auto-focused zone.</p>
          <textarea placeholder="Drop quick notes or todo bullets..."></textarea>
        </section>
      </div>
    </div>
  `,
})
export class EditorLayoutComponent {
  readonly tabs = [
    { path: 'notes', label: 'Notes' },
    { path: 'drafts', label: 'Drafts' },
    { path: 'scratch', label: 'Scratch' },
  ];
}
