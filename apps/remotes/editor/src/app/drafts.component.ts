import { Component } from '@angular/core';

@Component({
  selector: 'app-drafts',
  standalone: true,
  template: `
    <h3 style="margin-top: 0">Drafts</h3>
    <p class="rc-subtle">Lightweight placeholder for future AI collaboration.</p>
    <div style="display: grid; gap: 0.75rem;">
      @for (draft of drafts; track draft.id) {
        <article
          class="rc-surface"
          style="padding: 0.9rem; border-radius: 12px; border: 1px solid var(--rc-border)"
        >
          <div class="rc-title" style="margin: 0 0 0.35rem">{{ draft.title }}</div>
          <p class="rc-subtle" style="margin: 0">{{ draft.summary }}</p>
        </article>
      }
    </div>
  `,
})
export class DraftsComponent {
  readonly drafts = [
    {
      id: 1,
      title: 'Pitch outline',
      summary: 'Hero, problem, and momentum bullets ready to refine.',
    },
    { id: 2, title: 'Launch checklist', summary: 'Tasks for demo day + dry-run timeline.' },
  ];
}
