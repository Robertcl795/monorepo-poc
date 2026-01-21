import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-scratch-view',
  standalone: true,
  template: `
    <h3 style="margin-top: 0">Scratch</h3>
    <p class="rc-subtle">Free-form canvas to park quick ideas.</p>
    <div contenteditable="true" class="notes-area" (input)="capture($event)">{{ value() }}</div>
  `,
})
export class ScratchComponent {
  readonly value = signal('Describe flows, paste snippets, or drop future todos.');

  capture(event: Event): void {
    const target = event.target as HTMLElement;
    this.value.set(target.innerText);
  }
}
