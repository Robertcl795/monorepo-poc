import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CovalentCodeEditorModule } from '@covalent/code-editor';
import type { editor } from 'monaco-editor';

@Component({
  selector: 'rc-cv-code-editor',
  standalone: true,
  imports: [FormsModule, CovalentCodeEditorModule],
  template: `
    <td-code-editor
      [(ngModel)]="modelValue"
      [language]="language()"
      [theme]="theme()"
      [editorOptions]="editorOptions()"
      (editorInitialized)="onEditorInit($event)"
      (editorConfigurationChanged)="configurationChanged.emit()"
    ></td-code-editor>
  `,
})
export class CvCodeEditorComponent {
  private readonly internalValue = signal('');

  value = input<string>('');
  language = input<string>('markdown');
  theme = input<string>('vs-dark');
  editorOptions = input<Record<string, unknown>>({ automaticLayout: true });

  valueChange = output<string>();
  editorInitialized = output<editor.IStandaloneCodeEditor>();
  configurationChanged = output<void>();

  constructor() {
    effect(() => {
      this.internalValue.set(this.value() ?? '');
    });
  }

  get modelValue(): string {
    return this.internalValue();
  }

  set modelValue(value: string) {
    this.internalValue.set(value ?? '');
    this.valueChange.emit(this.internalValue());
  }

  onEditorInit(instance: editor.IStandaloneCodeEditor): void {
    this.editorInitialized.emit(instance);
  }
}
