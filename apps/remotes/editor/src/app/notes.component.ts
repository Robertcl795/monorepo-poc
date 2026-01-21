import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h3 style="margin-top: 0">Notes</h3>
    <p class="rc-subtle">Signals drive live stats while staying zoneless.</p>
    <textarea
      [(ngModel)]="noteText"
      placeholder="Start typing..."
      (input)="updateNote($event)"
    ></textarea>
    <div
      style="display: flex; justify-content: space-between; margin-top: 0.75rem; color: var(--rc-muted)"
    >
      <span>{{ wordCount() }} words</span>
      <span>{{ chars() }} chars</span>
    </div>
  `,
})
export class NotesComponent {
  readonly note = signal('');

  readonly wordCount = computed(() => this.note().trim().split(/\s+/).filter(Boolean).length);

  readonly chars = computed(() => this.note().length);

  get noteText(): string {
    return this.note();
  }

  set noteText(value: string) {
    this.note.set(value);
  }

  updateNote(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.note.set(target.value);
  }
}
