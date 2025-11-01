import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SjButtonComponent,
  SjFlexComponent,
  SjTypographyComponent,
  SjDirective,
  sj,
} from 'super-jss';
import { JsonTreeComponent } from './json-tree.component';

@Component({
  selector: 'app-json-studio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SjButtonComponent,
    SjFlexComponent,
    SjTypographyComponent,
    SjDirective,
    JsonTreeComponent,
  ],
  template: `
    <sj-flex
      [sj]="[sj.fxDir(sj.fxDir.options.column), sj.gap(0.5), sj.w('100%')]"
    >
      <!-- Header with controls -->
      <sj-flex
        [sj]="[
          sj.fxDir(sj.fxDir.options.row),
          sj.justifyContent(sj.justifyContent.options.spaceBetween),
          sj.alignItems(sj.alignItems.options.center)
        ]"
      >
        <sj-typography variant="small" [sj]="{ c: sj.palette.neutral.main }"
          >JSON Editor</sj-typography
        >
        <sj-flex [sj]="[sj.fxDir(sj.fxDir.options.row), sj.gap(0.25)]">
          <sj-button
            [variant]="'flat'"
            [sj]="mode() === 'raw' ? { fw: 600 } : {}"
            (click)="setMode('raw')"
            >Raw</sj-button
          >
          <sj-button
            [variant]="'flat'"
            [sj]="mode() === 'tree' ? { fw: 600 } : {}"
            (click)="setMode('tree')"
            >Tree</sj-button
          >
        </sj-flex>
      </sj-flex>

      <!-- Error display -->
      @if (error()) {
      <div [sj]="styles.error">
        <sj-typography variant="small" [sj]="{ c: 'error.main' }">
          {{ error() }}
        </sj-typography>
      </div>
      }

      <!-- Editor -->
      @if (mode() === 'raw') {
      <textarea
        id="raw-editor"
        [sj]="styles.editor"
        [ngModel]="jsonString()"
        (ngModelChange)="onEdit($event)"
        (keydown)="preventUndo($event)"
        placeholder="Enter JSON here"
        wrap="off"
        spellcheck="false"
      ></textarea>
      } @else {
        <app-json-tree [value]="treeValue()" (valueChange)="onTreeChange($event)" />
      }
    </sj-flex>
  `,
})
export class JsonStudioComponent implements OnChanges {
  @Input() value: any | null = null;
  @Output() valueChange = new EventEmitter<any>();

  readonly sj = sj;

  // simple mode signal to toggle between Raw and Tree
  mode = signal<'raw' | 'tree'>('tree');

  setMode(m: 'raw' | 'tree') {
    this.mode.set(m);
  }

  readonly styles = {
    error: {
      c: 'error.main',
      bg: 'error.light',
      b: '1px solid',
      bc: 'error.main',
      brad: 0.5,
      p: 0.5,
    },
    editor: {
      w: '100%',
      minH: 18.75, // 300px
      fontFamily:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: 0.8125, // 13px
      lineHeight: 1.4,
      p: 0.75,
      b: '1px solid',
      bc: 'neutral.light',
      brad: 0.375,
      bg: 'light.main',
      c: 'neutral.dark',
    },
  };

  jsonString = signal<string>(`{
  "hello": "world",
  "nested": {
    "a": 1,
    "b": true,
    "c": null,
    "d": [1, 2, 3]
  }
}`);
  error = signal<string | null>(null);

  // Derived value for tree input (parse jsonString when switching views)
  treeValue = (): any => {
    try {
      return JSON.parse(this.jsonString());
    } catch {
      return null;
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      if (this.value != null) {
        const str = JSON.stringify(this.value, this.replacer, 2);
        this.jsonString.set(str);
        this.error.set(null);
      }
    }
  }

  onEdit(str: string) {
    this.jsonString.set(str);
    this.parseJson();
  }

  parseJson() {
    try {
      const parsed = JSON.parse(this.jsonString());
      this.valueChange.emit(parsed);
      this.error.set(null);
    } catch (e: any) {
      this.error.set(String(e?.message ?? e));
    }
  }

  onTreeChange(updated: any) {
    this.valueChange.emit(updated);
  }

  preventUndo(event: KeyboardEvent) {
    const key = (event.key || '').toLowerCase();
    const hasMod = event.ctrlKey || event.metaKey;
    if (!hasMod) return;
    if (key === 'z' || key === 'y') {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  formatJson() {
    try {
      const parsed = JSON.parse(this.jsonString());
      const formatted = JSON.stringify(parsed, null, 2);
      this.jsonString.set(formatted);
      this.error.set(null);
      this.valueChange.emit(parsed);
    } catch (e: any) {
      this.error.set('Invalid JSON: ' + e.message);
    }
  }

  compactJson() {
    try {
      const parsed = JSON.parse(this.jsonString());
      const compacted = JSON.stringify(parsed);
      this.jsonString.set(compacted);
      this.error.set(null);
      this.valueChange.emit(parsed);
    } catch (e: any) {
      this.error.set('Invalid JSON: ' + e.message);
    }
  }

  private replacer(_key: string, value: any) {
    if (typeof value === 'function') return undefined;
    return value;
  }
}
