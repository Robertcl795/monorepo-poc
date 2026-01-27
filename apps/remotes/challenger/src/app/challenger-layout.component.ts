import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RcButtonComponent } from '@rocker-code/shared';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-challenger-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RcButtonComponent, MatCardModule],
  template: `
    <div class="challenger-shell">
      <aside class="challenger-sidebar">
        <div class="badge">Challenger Remote</div>
        <h2 class="rc-title" style="margin-top: 0.5rem">Planner</h2>
        <p class="rc-subtle">
          Navigate weeks or jump to inbox. Links are pure routes for deep-linking.
        </p>
        <nav style="display: grid; gap: 0.35rem; margin-top: 1rem;">
          @for (link of links; track link.path) {
            <a class="nav-item" [routerLink]="link.path" routerLinkActive="active">{{
              link.label
            }}</a>
          }
        </nav>
        <div style="margin-top: 1.5rem;">
          <rc-button [accent]="true" label="Add block" />
        </div>
      </aside>
      <section class="challenger-main">
        <mat-card class="rc-subtle" style="margin-bottom: 1rem;">Planner view</mat-card>
        <router-outlet></router-outlet>
      </section>
    </div>
  `,
})
export class ChallengerLayoutComponent {
  readonly today = new Date().toISOString().slice(0, 10);
  readonly links = [
    { path: ['/week', this.today], label: 'This week' },
    { path: ['/inbox'], label: 'Inbox' },
  ];
}
