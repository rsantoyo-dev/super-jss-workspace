import {
  Component,
  signal,
  WritableSignal,
  effect,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JsonNodeComponent, JsonNode } from './sj-json-node.component';
import {
  editorShell,
  headerBar,
  studioContainer,
  editorPanel,
  textareaStyle,
  errorStyle,
  panelHeader,
  headerBtn,
} from './json-studio.sjstyles';
import { SjDirective } from 'projects/super-jss/src/public-api';
import { PanelHeaderComponent } from './panel-header.component';
import { sjCard, SjStyle } from 'super-jss';

@Component({
  selector: 'app-json-studio',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    JsonNodeComponent,
    SjDirective,
    PanelHeaderComponent,
  ],
  template: `
    <div [sj]="treePanelStyle">
      <app-panel-header
        title="JSON Editor"
        (collapse)="setTreeMode('collapsed')"
        (normal)="setTreeMode('normal')"
        (full)="setTreeMode('full')"
        [viewMode]="viewMode()"
        [mode]="treeMode()"
        (viewModeChange)="viewMode.set($event)"
      />
      <div [sj]="treeContentStyle">
        <div [hidden]="!error()" [sj]="styles.error">
          <p [sj]>Error: {{ error() }}</p>
        </div>
        @if (viewMode() === 'raw') {

        <textarea
          id="raw-editor"
          [sj]="styles.textarea"
          [ngModel]="jsonString()"
          (ngModelChange)="jsonString.set($event); parseJson()"
          (keydown)="preventUndo($event)"
          placeholder="Enter JSON here"
          [attr.wrap]="'off'"
        ></textarea>

        } @else { @if (rootNode()) {
        <app-json-node
          [node]="rootNode()!"
          [isRoot]="true"
          (update)="onNodeUpdate($event)"
          (remove)="onNodeRemove($event)"
        ></app-json-node>
        } }
      </div>
    </div>
  `,
  // Removed CSS file in favor of SJSS styles
})
export class JsonStudioComponent implements OnChanges {
  // Typed external value to edit (for this demo: SjTheme)
  @Input() value: any | null = null;
  @Output() valueChange = new EventEmitter<any>();
  jsonString = signal(`{
    "hello": "world",
    "nested": {
      "a": 1,
      "b": true,
      "c": null,
      "d": [1, 2, 3]
    }
  }`);
  rootNode: WritableSignal<JsonNode | null> = signal(null);
  error = signal<string | null>(null);

  // Guard flags/state to prevent feedback loops
  private applyingFromInput = false;
  private lastEmittedStr: string | null = null;

  // Expose SJSS styles to the template
  readonly styles = {
    shell: editorShell,
    header: headerBar,
    container: studioContainer,
    panel: editorPanel,
    textarea: textareaStyle,
    error: errorStyle,
    panelHeader: panelHeader,
    headerBtn: headerBtn,
    actions: { d: 'flex', gap: 0.5 } as any,
  };

  // Panel view state signals: 'collapsed' | 'normal' (500px) | 'full' (70vh)
  treeMode = signal<'collapsed' | 'normal' | 'full'>('normal');
  // Editor view toggle: tree | raw
  viewMode = signal<'tree' | 'raw'>('tree');

  // Dynamic style producers used by [sj]
  treePanelStyle = () => ({
    ...this.styles.panel,
    d: 'flex',
    fxDir: 'column',
  });

  treeContentStyle = () => {
    const mode = this.treeMode();
    const isRaw = this.viewMode() === 'raw';
    if (mode === 'collapsed') return { d: 'none' } as any;
    if (mode === 'normal') {
      // Expanded: Tree scrolls inside 300px; Raw avoids outer scroll
      return {
        ...sjCard.flat(),
        d: 'flex',
        fxDir: 'column',
        p: 0,
        h: '300px',
        minH: 0,
        overflowY: isRaw ? 'hidden' : 'auto',
        overflowX: isRaw ? 'hidden' : 'auto',
      } as SjStyle;
    }
    // Full: size to content; Tree grows naturally; Raw also grows by its own size
    return {
      ...sjCard.flat(),
      d: 'block',
      p: 0,
      h: 'auto',
      overflow: 'visible',
    } as SjStyle;
  };

  // Panel header action handlers
  setTreeMode(mode: 'collapsed' | 'normal' | 'full') {
    this.treeMode.set(mode);
  }

  // Block undo/redo shortcuts inside the Raw textarea
  preventUndo(event: KeyboardEvent) {
    const key = (event.key || '').toLowerCase();
    const hasMod = event.ctrlKey || event.metaKey;
    if (!hasMod) return;
    if (key === 'z' || key === 'y') {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  constructor() {
    effect(() => {
      const node = this.rootNode();
      if (node) {
        if (this.applyingFromInput) return; // skip emission when syncing from parent input
        const obj = this.transformFromNode(node);
        const str = JSON.stringify(obj, this.replacer, 2);
        // Avoid unnecessary updates to the textarea
        if (str !== this.jsonString()) this.jsonString.set(str);
        // Emit only if content actually changed since last emit
        if (str !== this.lastEmittedStr) {
          this.lastEmittedStr = str;
          this.valueChange.emit(obj);
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      const incoming = this.value;
      if (incoming != null) {
        // Initialize Studio from typed input (drop functions/undefined safely)
        const str = JSON.stringify(incoming, this.replacer, 2);
        this.jsonString.set(str);
        try {
          const parsed = JSON.parse(str);
          // Prevent feedback loop while syncing from input
          this.applyingFromInput = true;
          const root = this.transformToNode('root', parsed);
          root.expanded = true; // keep root open by default
          this.rootNode.set(root);
          this.lastEmittedStr = str; // align last emitted with incoming state
          this.applyingFromInput = false;
          this.error.set(null);
        } catch (e: any) {
          this.error.set(e.message);
        }
      }
    }
  }

  parseJson() {
    try {
      const parsedJson = JSON.parse(this.jsonString());
      const root = this.transformToNode('root', parsedJson);
      root.expanded = true; // keep root open by default
      this.rootNode.set(root);
      this.error.set(null);
    } catch (e: any) {
      this.error.set(e.message);
      this.rootNode.set(null);
    }
  }

  private transformToNode(key: string, value: any): JsonNode {
    const type = this.getType(value);
    const node: JsonNode = { key, value, type, expanded: false };

    if (type === 'object') {
      node.children = Object.keys(value).map((k) =>
        this.transformToNode(k, value[k])
      );
    } else if (type === 'array') {
      node.children = value.map((item: any, index: number) =>
        this.transformToNode(index.toString(), item)
      );
    }

    return node;
  }

  private getType(
    value: any
  ): 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null' {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    return 'null';
  }

  onNodeUpdate(node: JsonNode) {
    // Ensure signal change by cloning to a new reference
    this.rootNode.set(this.cloneNode(node));
  }

  onNodeRemove(nodeToRemove: JsonNode) {
    if (this.rootNode() === nodeToRemove) {
      this.rootNode.set(null);
      return;
    }

    const remove = (node: JsonNode) => {
      if (node.children) {
        const index = node.children.findIndex(
          (c) => c.key === nodeToRemove.key
        );
        if (index > -1) {
          node.children.splice(index, 1);
          return true;
        }
        for (const child of node.children) {
          if (remove(child)) {
            return true;
          }
        }
      }
      return false;
    };

    if (this.rootNode()) {
      remove(this.rootNode()!);
      // Clone to force a new reference so effects run
      this.rootNode.set(this.cloneNode(this.rootNode()!));
    }
  }

  private transformFromNode(node: JsonNode): any {
    if (node.type === 'object' && node.children) {
      return node.children.reduce((acc, child) => {
        acc[child.key] = this.transformFromNode(child);
        return acc;
      }, {} as any);
    } else if (node.type === 'array' && node.children) {
      return node.children.map((child) => this.transformFromNode(child));
    } else {
      return node.value;
    }
  }

  // Create a deep clone of a JsonNode tree so signal updates are detected
  private cloneNode(node: JsonNode): JsonNode {
    return {
      key: node.key,
      value: node.value,
      type: node.type,
      expanded: node.expanded,
      children: node.children
        ? node.children.map((c) => this.cloneNode(c))
        : undefined,
    };
  }

  // JSON.stringify replacer to skip functions/undefined when serializing typed objects
  private replacer(_key: string, value: any) {
    if (typeof value === 'function') return undefined;
    return value;
  }
}
