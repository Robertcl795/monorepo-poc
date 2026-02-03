import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-vs-layout',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="vs-shell">
      <aside class="vs-sidebar">
        <div class="badge">VS Remote</div>
        <h2 class="rc-title" style="margin-top: 0.5rem">Workspace layout</h2>
        <p class="rc-subtle">Layout-only skeleton inspired by editor panes and timeline regions.</p>
        <div class="vs-sidebar__block"></div>
        <div class="vs-sidebar__block"></div>
      </aside>
      <section class="vs-main">
        <mat-card class="vs-surface">
          <div class="rc-title">Primary canvas</div>
          <p class="rc-subtle" style="margin: 0">Placeholder for VS-style panels.</p>
        </mat-card>
        <mat-card class="vs-surface">
          <div class="rc-title">Inspector</div>
          <p class="rc-subtle" style="margin: 0">Secondary area with detail cards.</p>
        </mat-card>
      </section>
    </div>
  `,
  styles: [
    `
      .vs-shell {
        display: grid;
        grid-template-columns: 260px 1fr;
        gap: 1.5rem;
        min-height: calc(100vh - 140px);
      }
      .vs-sidebar {
        padding: 1.5rem;
        background: var(--rc-surface);
        border: 1px solid var(--rc-border);
        border-radius: var(--rc-radius);
        display: grid;
        gap: 1rem;
      }
      .vs-sidebar__block {
        height: 64px;
        border-radius: 12px;
        border: 1px dashed var(--rc-border);
        background: var(--rc-bg);
      }
      .vs-main {
        display: grid;
        gap: 1rem;
      }
      .vs-surface {
        padding: 1.25rem;
        border-radius: 16px;
        border: 1px solid var(--rc-border);
        background: linear-gradient(120deg, var(--rc-surface), var(--rc-surface-strong));
      }
      .badge {
        display: inline-flex;
        padding: 0.3rem 0.75rem;
        border-radius: 999px;
        border: 1px solid var(--rc-border);
        color: var(--rc-muted);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
    `,
  ],
})
export class VsLayoutComponent {}
