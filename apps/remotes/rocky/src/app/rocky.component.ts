import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RcButtonComponent } from '@rocker-code/shared';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-rocky-home',
  standalone: true,
  imports: [FormsModule, RcButtonComponent, MatCardModule, MatChipsModule],
  template: `
    <div class="rocky-shell">
      <mat-card class="rocky-card">
        <mat-chip-set aria-label="Remote info">
          <mat-chip highlighted color="primary">Material remote</mat-chip>
        </mat-chip-set>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
          <div>
            <p class="badge" style="margin: 0">Rocky Remote</p>
            <h2 class="rc-title" style="margin: 0.25rem 0 0">Command palette</h2>
            <p class="rc-subtle" style="margin: 0">Type anything and we'll show mock matches.</p>
          </div>
          <rc-button [accent]="true" label="New command" />
        </div>
        <div style="margin-top: 1rem;">
          <input
            class="rocky-search"
            placeholder="Jump to feature, search docs, or run a task..."
            [(ngModel)]="query"
          />
          <div class="result-list">
            @for (result of filtered(); track result.id) {
              <div class="result-card">
                <div class="rc-title" style="margin: 0 0 0.35rem">{{ result.title }}</div>
                <p class="rc-subtle" style="margin: 0">{{ result.subtitle }}</p>
              </div>
            }
          </div>
        </div>
      </mat-card>
    </div>
  `,
})
export class RockyComponent {
  readonly query = signal('');

  readonly options = [
    { id: 1, title: 'Open editor', subtitle: 'Navigate directly to the notes space.' },
    { id: 2, title: 'Sync calendar', subtitle: 'Push updates to Challenger planning.' },
    { id: 3, title: 'Search roadmap', subtitle: 'Scan experiments for this quarter.' },
  ];

  readonly filtered = computed(() => {
    const term = this.query().toLowerCase();
    if (!term) return this.options;
    return this.options.filter(
      (opt) => opt.title.toLowerCase().includes(term) || opt.subtitle.toLowerCase().includes(term),
    );
  });
}
