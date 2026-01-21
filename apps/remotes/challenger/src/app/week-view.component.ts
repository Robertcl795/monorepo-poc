import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-week-view',
  standalone: true,
  template: `
    <div class="page-header">
      <div>
        <div class="badge">Week focus</div>
        <h2 class="rc-title" style="margin: 0.35rem 0 0">Week of {{ displayDate() }}</h2>
        <p class="rc-subtle" style="margin: 0">
          Deep links like /week/2026-01-20 land directly here.
        </p>
      </div>
    </div>
    <div class="calendar-grid">
      @for (day of weekDays(); track day) {
        <div class="calendar-cell">
          <div class="rc-title" style="margin: 0 0 0.25rem">{{ day }}</div>
          <p class="rc-subtle" style="margin: 0">Plan placeholder</p>
        </div>
      }
    </div>
  `,
})
export class WeekViewComponent {
  private readonly route = inject(ActivatedRoute);

  readonly dateParam = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('date') ?? new Date().toISOString().slice(0, 10)),
      startWith(new Date().toISOString().slice(0, 10)),
    ),
  );

  readonly displayDate = computed(() => this.dateParam());

  readonly weekDays = computed(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
}
