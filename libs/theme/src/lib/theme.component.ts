import { Component, computed } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'rc-theme-toggle',
  standalone: true,
  imports: [],
  template: `
    <button type="button" class="rc-theme-toggle" (click)="toggle()">
      <span class="rc-dot"></span>
      <span class="rc-label">{{ label() }}</span>
    </button>
  `,
  styles: `
    .rc-theme-toggle {
      align-items: center;
      background: var(--rc-surface);
      border: 1px solid var(--rc-border);
      border-radius: 999px;
      color: var(--rc-text);
      cursor: pointer;
      display: inline-flex;
      gap: 0.5rem;
      padding: 0.35rem 0.85rem;
      transition:
        background 150ms ease,
        transform 150ms ease,
        border-color 150ms ease;
    }
    .rc-theme-toggle:hover {
      background: var(--rc-surface-strong);
      border-color: var(--rc-accent);
    }
    .rc-theme-toggle:active {
      transform: translateY(1px);
    }
    .rc-dot {
      background: linear-gradient(135deg, var(--rc-accent), var(--rc-accent-strong));
      border-radius: 50%;
      display: inline-block;
      height: 0.75rem;
      width: 0.75rem;
      box-shadow: 0 0 0 2px var(--rc-surface);
    }
    .rc-label {
      font-size: 0.875rem;
      letter-spacing: 0.01em;
      text-transform: uppercase;
    }
  `,
})
export class ThemeComponent {
  readonly label = computed(() => (this.theme.themeClass() === 'dark' ? 'Dark' : 'Light'));

  constructor(private readonly theme: ThemeService) {}

  toggle(): void {
    this.theme.toggle();
  }
}
