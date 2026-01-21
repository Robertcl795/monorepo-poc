import { Component } from '@angular/core';

@Component({
  selector: 'app-inbox',
  standalone: true,
  template: `
    <div class="page-header">
      <div>
        <div class="badge">Inbox</div>
        <h2 class="rc-title" style="margin: 0.35rem 0 0">Unsorted challenges</h2>
        <p class="rc-subtle" style="margin: 0">Route stays stable so deep links keep working.</p>
      </div>
    </div>
    <div class="content-card" style="display: grid; gap: 0.75rem;">
      @for (item of items; track item.id) {
        <div
          class="rc-surface"
          style="padding: 0.85rem; border-radius: 12px; border: 1px solid var(--rc-border);"
        >
          <div class="rc-title">{{ item.title }}</div>
          <p class="rc-subtle" style="margin: 0;">{{ item.detail }}</p>
        </div>
      }
    </div>
  `,
})
export class InboxComponent {
  readonly items = [
    { id: 1, title: 'Prep weekly review', detail: 'Outline wins and blockers.' },
    { id: 2, title: 'Sync with editor', detail: 'Mirror notes into schedule.' },
  ];
}
