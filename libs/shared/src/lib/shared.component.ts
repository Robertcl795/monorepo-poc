import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'rc-button',
  standalone: true,
  template: `
    <button type="button" class="rc-btn" [class.rc-btn-accent]="accent()" [disabled]="disabled()">
      <span class="rc-btn-label"><ng-content></ng-content>{{ label() }}</span>
    </button>
  `,
  styles: `
    :host {
      display: inline-block;
    }
    .rc-btn {
      align-items: center;
      background: linear-gradient(120deg, var(--rc-surface), var(--rc-surface-strong));
      border: 1px solid var(--rc-border);
      border-radius: 12px;
      color: var(--rc-text);
      cursor: pointer;
      display: inline-flex;
      font-weight: 600;
      gap: 0.45rem;
      letter-spacing: 0.01em;
      min-height: 40px;
      padding: 0.55rem 1rem;
      transition:
        border-color 150ms ease,
        transform 150ms ease,
        background 150ms ease,
        box-shadow 150ms ease;
    }
    .rc-btn:hover {
      border-color: var(--rc-accent);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }
    .rc-btn:active {
      transform: translateY(1px);
    }
    .rc-btn-accent {
      background: linear-gradient(135deg, var(--rc-accent), var(--rc-accent-strong));
      border-color: transparent;
      color: #0b1220;
    }
    .rc-btn[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }
  `,
})
export class RcButtonComponent {
  @HostBinding('class') hostClass = 'rc-btn-host';

  label = input<string>('');
  accent = input<boolean>(false);
  disabled = input<boolean>(false);
}
