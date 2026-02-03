import { Component, CUSTOM_ELEMENTS_SCHEMA, computed } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'rc-theme-toggle',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="rc-theme-toggle">
      <md-switch [selected]="isDark()" (change)="toggle()" aria-label="Toggle theme"></md-switch>
      <span class="rc-label">{{ label() }}</span>
    </div>
  `,
  styles: `
    .rc-theme-toggle {
      align-items: center;
      color: var(--rc-text);
      display: inline-flex;
      gap: 0.5rem;
      padding: 0.2rem 0.45rem;
    }
    .rc-label {
      font-size: 0.875rem;
      letter-spacing: 0.01em;
      text-transform: uppercase;
    }
  `,
})
export class ThemeComponent {
  readonly isDark = computed(() => this.theme.themeClass() === 'dark');
  readonly label = computed(() => (this.theme.themeClass() === 'dark' ? 'Dark' : 'Light'));

  constructor(private readonly theme: ThemeService) {}

  toggle(): void {
    this.theme.toggle();
  }
}
