import {
  AfterViewInit,
  Component,
  DestroyRef,
  EffectRef,
  ElementRef,
  ViewChild,
  inject,
  signal,
  effect,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@rocker-code/theme';

type MonacoNamespace = typeof import('monaco-editor');

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="editor-grid">
      <div class="editor-pane">
        <div #editorHost class="monaco-host" aria-label="Monaco editor"></div>
      </div>
      <div class="editor-pane preview">
        <h3 class="rc-title" style="margin-top: 0">Preview</h3>
        <pre>{{ noteText }}</pre>
      </div>
    </section>

    <div class="editor-meta rc-subtle">
      <span>{{ wordCount() }} words</span>
      <span>{{ chars() }} chars</span>
    </div>
  `,
  styles: [
    `
      .editor-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 1rem;
        align-items: stretch;
      }
      .editor-pane {
        background: var(--rc-surface);
        border: 1px solid var(--rc-border);
        border-radius: var(--rc-radius);
        padding: 1rem;
        box-shadow: 0 25px 60px rgb(0 0 0 / 18%);
        min-height: 420px;
      }
      .preview {
        overflow: auto;
      }
      .monaco-host {
        height: 420px;
      }
      .editor-meta {
        display: flex;
        gap: 1rem;
        margin-top: 0.75rem;
      }
    `,
  ],
})
export class NotesComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly themeService = inject(ThemeService);

  @ViewChild('editorHost', { static: false }) editorHost?: ElementRef<HTMLDivElement>;

  private editorInstance?: import('monaco-editor').editor.IStandaloneCodeEditor;
  private monacoRef?: MonacoNamespace;
  private themeEffect?: EffectRef;

  private readonly note = signal<string>(
    `# Material shell + Monaco
Pure Monaco setup with Angular 19 + Native Federation.

- Assets served from /assets/monaco
- Signals power preview + counters
- Theme follows host (vs / vs-dark)
`,
  );

  readonly wordCount = computed(() => this.note().trim().split(/\s+/).filter(Boolean).length);
  readonly chars = computed(() => this.note().length);

  ngAfterViewInit(): void {
    void this.setupEditor();
  }

  get noteText(): string {
    return this.note();
  }

  set noteText(value: string) {
    this.note.set(value ?? '');
    this.editorInstance?.getModel()?.setValue(value ?? '');
  }

  private async setupEditor(): Promise<void> {
    const host = this.editorHost?.nativeElement;
    if (!host) return;

    const monaco = await import('monaco-editor');
    this.monacoRef = monaco;
    this.configureWorkers(monaco);

    this.editorInstance = monaco.editor.create(host, {
      value: this.note(),
      language: 'markdown',
      automaticLayout: true,
      wordWrap: 'on',
      minimap: { enabled: false },
      fontSize: 14,
      scrollBeyondLastLine: false,
      theme: this.currentMonacoTheme(monaco),
    });

    const model = this.editorInstance.getModel();
    const sub = this.editorInstance.onDidChangeModelContent(() => {
      const value = model?.getValue() ?? '';
      this.note.set(value);
    });

    this.themeEffect = effect(() => {
      if (!this.monacoRef || !this.editorInstance) return;
      this.monacoRef.editor.setTheme(this.currentMonacoTheme(this.monacoRef));
    });

    this.destroyRef.onDestroy(() => {
      sub?.dispose();
      this.themeEffect?.destroy();
      this.editorInstance?.dispose();
      model?.dispose();
    });
  }

  private configureWorkers(_monaco: MonacoNamespace): void {
    const origin = new URL(import.meta.url).origin;
    const basePath = `${origin}/assets/monaco`;
    (globalThis as MonacoWorkerGlobal).MonacoEnvironment = {
      getWorkerUrl: (_: string, label: string) => {
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

  private currentMonacoTheme(_monaco: MonacoNamespace): string {
    return this.themeService.themeClass() === 'dark' ? 'vs-dark' : 'vs';
  }
}

type MonacoWorkerGlobal = typeof globalThis & {
  MonacoEnvironment?: {
    getWorkerUrl: (_: string, label: string) => string;
  };
};
