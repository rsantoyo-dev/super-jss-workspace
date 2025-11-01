import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Output,
  input,
  computed,
  signal,
} from '@angular/core';
import {
  SjPaperComponent,
  SjFlexComponent,
  SjTypographyComponent,
  SjInputComponent,
  SjButtonComponent,
  SjRootApi,
  sj,
  SjDirective,
} from 'super-jss';

@Component({
  selector: 'app-json-tree',
  standalone: true,
  styles: [
    `:host .sj-hidden-color-input {\n      -webkit-appearance: none;\n      appearance: none;\n      border: 0;\n      padding: 0;\n      background: transparent;\n      outline: none;\n    }`,
    `:host .sj-hidden-color-input::-webkit-color-swatch-wrapper {\n      padding: 0;\n    }`,
    `:host .sj-hidden-color-input::-webkit-color-swatch {\n      border: none;\n    }`,
    `:host .sj-hidden-color-input::-moz-color-swatch {\n      border: none;\n    }`,
    `:host .sj-hidden-color-input::-moz-focus-inner {\n      border: 0;\n      padding: 0;\n    }`,
    `:host .sj-input-native[type="color"] {\n      -webkit-appearance: none;\n      appearance: none;\n      border: 0;\n      padding: 0;\n      background: transparent;\n      outline: none;\n      width: 100%;\n      height: 100%;\n      opacity: 0;\n      cursor: pointer;\n    }`,
    `:host .sj-input-native[type="color"]::-webkit-color-swatch-wrapper {\n      padding: 0;\n    }`,
    `:host .sj-input-native[type="color"]::-webkit-color-swatch {\n      border: none;\n    }`,
    `:host .sj-input-native[type="color"]::-moz-color-swatch {\n      border: none;\n    }`,
    `:host .sj-input-native[type="color"]::-moz-focus-inner {\n      border: 0;\n      padding: 0;\n    }`,
  ],
  template: `
    <sj-paper variant="outlined">
      <sj-flex useCol usePadding="compact" useGap="compact">
        <sj-typography variant="strong">Tree (preview)</sj-typography>

        <!-- Recursive node template: column per key; value below; children recurse -->
        <ng-template
          #renderNode
          let-node="node"
          let-label="label"
          let-depth="depth"
          let-path="path"
        >
          <sj-flex
            useCol
            useGap="compact"
            usePadding="compact"
            [sj]="sj.ml((depth ?? 0) * 1)"
          >
            @if (!isPrimitive(node)) {
            <sj-flex
              [sj]="[sj.fxDir('row'), sj.gap(0.25), sj.fxAItems('center')]"
            >
              <span
                (click)="toggleNode(path ?? [])"
                [sj]="{
                  cursor: 'pointer',
                  userSelect: 'none',
                  display: 'inline-flex',
                  alignItems: 'center'
                }"
              >
                <span [sj]="{ display: 'inline-block', width: '1rem' }">
                  {{ isCollapsed(path ?? []) ? '▸' : '▾' }}
                </span>
                <sj-typography variant="small">{{ label }}</sj-typography>
              </span>
            </sj-flex>
            } @if (isPrimitive(node)) {
            <sj-flex
              useGap="compact"
              [sj]="sj.alignItems(sj.alignItems.options.center)"
            >
              <sj-typography variant="small">{{ label }}</sj-typography>
              @if (isHexColor(node) || isTokenColor(node) || isColorKey(label))
              {
              <label
                [sj]="{
                  position: 'relative',
                  display: 'inline-block',
                  cursor: 'pointer'
                }"
              >
                <sj-paper
                  useRounded="compact"
                  usePadding="compact"
                  [sj]="{
                    w: 2,
                    h: 2,
                    bc: 'light.dark',
                    bg: resolveColor(node),
                    cursor: 'pointer'
                  }"
                ></sj-paper>
                <sj-input
                  density="compact"
                  variant="flat"
                  type="color"
                  usePadding="compact"
                  useRounded="compact"
                  aria-label="Pick color"
                  [value]="resolveColor(node)"
                  (valueChange)="onEditLeaf(path ?? [], $event, node)"
                  [sj]="{
                    position: 'absolute',
                    width: '1%',
                  }"
                ></sj-input>
              </label>
              }
              <sj-input
                variant="outlined"
                [type]="isNumber(node) ? 'number' : 'text'"
                [usePadding]="'compact'"
                [useRounded]="'compact'"
                [value]="stringify(node)"
                (valueChange)="onEditLeaf(path ?? [], $event, node)"
              ></sj-input>
            </sj-flex>
            } @else if (isArray(node)) {
            <!-- One child per row for arrays -->
            <sj-flex
              useCol
              useGap="compact"
              [sj]="{ display: isCollapsed(path ?? []) ? 'none' : 'flex' }"
            >
              @for (item of node; track $index) {
              <ng-container
                [ngTemplateOutlet]="renderNode"
                [ngTemplateOutletContext]="{
                  node: item,
                  label: '[' + $index + ']',
                  depth: (depth ?? 0) + 1,
                  path: nextPath(path, $index)
                }"
              ></ng-container>
              }
            </sj-flex>
            } @else {
            <!-- One child per row for objects -->
            <sj-flex
              useCol
              useGap="compact"
              [sj]="{ display: isCollapsed(path ?? []) ? 'none' : 'flex' }"
            >
              @for (k of objectKeys(node); track k) {
              <ng-container
                [ngTemplateOutlet]="renderNode"
                [ngTemplateOutletContext]="{
                  node: getValue(node, k),
                  label: k,
                  depth: (depth ?? 0) + 1,
                  path: nextPath(path, k)
                }"
              ></ng-container>
              }
            </sj-flex>
            }
          </sj-flex>
        </ng-template>

        <ng-container
          [ngTemplateOutlet]="renderNode"
          [ngTemplateOutletContext]="{
            node: value(),
            label: 'root',
            depth: 0,
            path: []
          }"
        ></ng-container>
      </sj-flex>
    </sj-paper>
  `,

  imports: [
    CommonModule,
    FormsModule,
    SjDirective,
    SjPaperComponent,
    SjFlexComponent,
    SjTypographyComponent,
    SjInputComponent,
  ],
})
export class JsonTreeComponent {
  readonly sj: SjRootApi = sj;
  value = input<any>();
  @Output() valueChange = new EventEmitter<any>();
  // Track expanded nodes (by path key). Root is open by default, others closed
  private expanded = signal<Set<string>>(new Set());

  emit() {
    this.valueChange.emit(this.value());
  }

  // Collapse/expand helpers
  private pathKey(path: any[]): string {
    return (path || []).join('__');
  }
  isCollapsed(path: any[] | undefined): boolean {
    const p = path || [];
    if (p.length === 0) return false; // root open by default
    const key = this.pathKey(p);
    return !this.expanded().has(key);
  }
  toggleNode(path: any[] | undefined) {
    const p = path || [];
    const key = this.pathKey(p);
    const next = new Set(this.expanded());
    if (next.has(key)) next.delete(key);
    else next.add(key);
    this.expanded.set(next);
  }

  isPrimitive(v: any): boolean {
    return (
      v === null ||
      typeof v === 'string' ||
      typeof v === 'number' ||
      typeof v === 'boolean'
    );
  }

  isArray(v: any): boolean {
    return Array.isArray(v);
  }

  isNumber(v: any): boolean {
    return typeof v === 'number' && Number.isFinite(v);
  }

  isHexColor(v: any): boolean {
    if (typeof v !== 'string') return false;
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v.trim());
  }

  isColorKey(label: any): boolean {
    if (typeof label !== 'string') return false;
    const k = label.trim().toLowerCase();
    return (
      k.includes('color') ||
      k === 'bg' ||
      k === 'background' ||
      k === 'backgroundcolor' ||
      k === 'bordercolor' ||
      k === 'fill' ||
      k === 'stroke'
    );
  }

  isTokenColor(v: any): boolean {
    if (typeof v !== 'string') return false;
    const m = v.trim().match(/^([a-zA-Z]+)\.(main|light|dark|contrast)$/);
    if (!m) return false;
    try {
      const theme = (this.sj as any).theme as any;
      return !!theme?.palette?.[m[1]]?.[m[2]];
    } catch {
      return false;
    }
  }

  resolveColor(v: any): string {
    if (this.isHexColor(v)) return String(v);
    if (this.isTokenColor(v)) {
      try {
        const theme = (this.sj as any).theme as any;
        const [fam, tone] = String(v).split('.') as [string, string];
        const hex = theme?.palette?.[fam]?.[tone];
        if (typeof hex === 'string' && this.isHexColor(hex)) return hex;
      } catch {}
    }
    return '#000000';
  }

  objectKeys(obj: any): string[] {
    try {
      return Object.keys(obj || {});
    } catch {
      return [];
    }
  }

  getValue(obj: any, key: string): any {
    try {
      return obj ? obj[key] : undefined;
    } catch {
      return undefined;
    }
  }

  // Helpers to support leaf editing
  stringify(v: any): string {
    if (v === null || v === undefined) return '';
    return String(v);
  }

  nextPath(path: any[] | undefined, key: any): any[] {
    const base = Array.isArray(path) ? path.slice() : [];
    base.push(key);
    return base;
  }

  colorId(path: any[]): string {
    try {
      return 'color_' + (path || []).join('_').replace(/[^a-zA-Z0-9_\-]/g, '');
    } catch {
      return 'color_root';
    }
  }

  openColorPicker(id: string) {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) return;
    try {
      const picker = (input as any).showPicker as undefined | (() => void);
      if (typeof picker === 'function') {
        picker.call(input);
      } else {
        input.click();
      }
    } catch {
      input.click();
    }
  }

  onEditLeaf(path: any[], raw: string, original: any) {
    const newVal = this.coerce(raw, original);
    const updated = this.setAtPath(this.value(), path, newVal);
    this.valueChange.emit(updated);
  }

  private coerce(raw: string, original: any): any {
    if (typeof original === 'number') {
      const n = Number(raw);
      return Number.isFinite(n) ? n : original;
    }
    if (typeof original === 'boolean') {
      const s = (raw || '').trim().toLowerCase();
      return s === 'true' || s === '1' || s === 'yes';
    }
    if (original === null) {
      return raw === '' ? null : raw;
    }
    return raw;
  }

  private setAtPath(obj: any, path: any[], val: any): any {
    if (!path || path.length === 0) return val;
    const [head, ...rest] = path;
    const isIndex =
      typeof head === 'number' ||
      (typeof head === 'string' && /^\d+$/.test(head));
    const idx = typeof head === 'number' ? head : isIndex ? Number(head) : head;
    if (Array.isArray(obj)) {
      const clone = obj.slice();
      clone[idx as number] = this.setAtPath(obj[idx as number], rest, val);
      return clone;
    }
    const clone: any = { ...(obj || {}) };
    clone[idx] = this.setAtPath(obj ? obj[idx] : undefined, rest, val);
    return clone;
  }
}
