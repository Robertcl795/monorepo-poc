import { Component, computed, inject, signal } from '@angular/core';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CvCodeEditorComponent } from './cv-code-editor.component';
import { ThemeService } from '@rocker-code/theme';
import { CovalentMessageModule } from '@covalent/core/message';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CvCodeEditorComponent, CovalentMarkdownModule, CovalentMessageModule],
  template: `
    <td-message
      label="Covalent code editor"
      sublabel="Markdown + Monaco running in a zoneless remote."
      color="primary"
      icon="code"
      [opened]="true"
    />

    <section class="editor-grid" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 1rem">
      <div class="editor-pane" style="padding: 0; overflow: hidden">
        <rc-cv-code-editor
          [(value)]="noteText"
          [language]="'markdown'"
          [theme]="monacoTheme()"
          [editorOptions]="editorOptions"
          (editorInitialized)="onEditorReady()"
        ></rc-cv-code-editor>
      </div>
      <div class="editor-pane" style="max-height: 520px; overflow: auto">
        <h3 style="margin: 0 0 0.5rem">Preview</h3>
        <td-markdown [content]="noteText" class="rc-subtle"></td-markdown>
      </div>
    </section>

    <div style="display: flex; gap: 1rem; color: var(--rc-muted); margin-top: 0.75rem">
      <span>{{ wordCount() }} words</span>
      <span>{{ chars() }} chars</span>
    </div>
  `,
})
export class NotesComponent {
  private readonly themeService = inject(ThemeService);

  private readonly note = signal<string>(
    `# Covalent + Native Federation
Start capturing ideas in markdown and render them live. Useful snippets:

- Workers served from \`/assets/monaco\`
- Zoneless change detection + signals
- Toggle theme from the host and Monaco follows
`,
  );

  readonly editorOptions = {
    automaticLayout: true,
    wordWrap: 'on',
    minimap: { enabled: false },
    fontSize: 14,
    scrollBeyondLastLine: false,
  };

  readonly monacoTheme = computed(() =>
    this.themeService.themeClass() === 'dark' ? 'vs-dark' : 'vs',
  );

  readonly wordCount = computed(() => this.note().trim().split(/\s+/).filter(Boolean).length);

  readonly chars = computed(() => this.note().length);

  constructor() {
    this.setupMonacoWorkers();
  }

  get noteText(): string {
    return this.note();
  }

  set noteText(value: string) {
    this.note.set(value ?? '');
  }

  onEditorReady(): void {
    // Ensure the current theme propagates when the editor spins up.
    this.note.update((text) => text);
  }

  private setupMonacoWorkers(): void {
    const basePath = '/assets/monaco';
    const globalRef = globalThis as typeof globalThis & {
      MonacoEnvironment?: {
        getWorkerUrl: (_: string, label: string) => string;
      };
    };

    if (!globalRef.MonacoEnvironment) {
      globalRef.MonacoEnvironment = {
        getWorkerUrl: (_moduleId: string, label: string) => {
          switch (label) {
            case 'json':
              return `${basePath}/vs/language/json/json.worker.js`;
            case 'css':
            case 'scss':
            case 'less':
              return `${basePath}/vs/language/css/css.worker.js`;
            case 'html':
            case 'handlebars':
            case 'razor':
              return `${basePath}/vs/language/html/html.worker.js`;
            case 'typescript':
            case 'javascript':
              return `${basePath}/vs/language/typescript/ts.worker.js`;
            default:
              return `${basePath}/vs/editor/editor.worker.js`;
          }
        },
      };
    }
  }
}
