import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-conv',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="conv-shell">
      <mat-card class="conv-card">
        <p class="badge">Conv Remote</p>
        <h2 class="rc-title" style="margin: 0.35rem 0 0">Conversation hub</h2>
        <p class="rc-subtle" style="margin: 0.25rem 0 0">
          Simple centered layout placeholder for chat-like experiences.
        </p>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .conv-shell {
        height: calc(100vh - 140px);
        display: grid;
        place-items: center;
      }
      .conv-card {
        padding: 2rem 2.5rem;
        border-radius: 18px;
        border: 1px solid var(--rc-border);
        background: var(--rc-surface);
        text-align: center;
        min-width: min(420px, 90vw);
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
export class ConvComponent {}
