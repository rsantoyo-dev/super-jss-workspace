import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SjDirective,
  SjFlexComponent,
  SjButtonComponent,
  SjTypographyComponent,
  SjInputComponent,
  sj,
  SjRootApi,
} from 'super-jss';

export interface JsonNode {
  key: string;
  value: any;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  children?: JsonNode[];
  expanded: boolean;
}

@Component({
  selector: 'app-json-node',
  standalone: true,
  imports: [
    FormsModule,
    SjDirective,
    SjFlexComponent,
    SjButtonComponent,
    SjTypographyComponent,
    SjInputComponent,
  ],
  template: `
    <sj-flex
      [sj]="[
        sj.fxDir(sj.fxDir.options.row),
        sj.ml(sj.margin.options.comfortable),
        sj.w('100%')
      ]"
    >
      <sj-flex
        [sj]="[
          sj.d(sj.d.options.flex),
          sj.fxDir(sj.fxDir.options.row),
          sj.alignItems(sj.alignItems.options.center),
          sj.gap(sj.gap.options.compact),
          sj.w('100%')
        ]"
      >
        @if ((node.type === 'object' || node.type === 'array') &&
        (node.children?.length ?? 0) > 0) {
        <sj-button
          [variant]="'outlined'"
          [useDensity]="1"
          [useRounded]="'compact'"
          [usePaint]="'primary'"
          (click)="toggle($event)"
        >
          <sj-typography
            variant="small"
            [sj]="{ c: sj.palette.primary.main }"
            >{{ node.expanded ? '/' : '>' }}</sj-typography
          >
        </sj-button>
        } @else {
        <sj-typography
          variant="span"
          [sj]="{ d: 'inline-block', w: 2, h: 2 }"
        ></sj-typography>
        }
        <sj-typography
          variant="span"
          (click)="toggle($event)"
          [sj]="sj.cursor('pointer')"
          >{{ node.key }}:</sj-typography
        >

        @switch (node.type) { @case ('string') { @if (isHexColor(node.value)) {
        <sj-typography
          variant="span"
          [sj]="[
            sj.display('flex'),
            sj.alignItems(sj.alignItems.options.center),
            sj.gap(0.5),
            { fxGrow: 1, minW: 0 }
          ]"
        >
          <input
            [sj]="{
              p: 0,
              bg: 'transparent',
              bs: 'none',
              bw: 0,
              w: 2,
              h: 2,
              cursor: 'pointer'
            }"
            type="color"
            [(ngModel)]="node.value"
            (ngModelChange)="onValueChange()"
          />
          <sj-input
            variant="outlined"
            type="text"
            [usePaint]="'none'"
            [usePadding]="'default'"
            [useRounded]="'default'"
            [fullWidth]="true"
            [sj]="[{ minW: 0 }]"
            [(value)]="node.value"
            (valueChange)="onValueChange()"
          ></sj-input>
        </sj-typography>
        } @else {
        <sj-input
          variant="outlined"
          type="text"
          [usePaint]="'none'"
          [usePadding]="'default'"
          [useRounded]="'default'"
          [fullWidth]="true"
          [sj]="[{ fxGrow: 1, minW: 0 }]"
          [(value)]="node.value"
          (valueChange)="onValueChange()"
        ></sj-input>
        } } @case ('number') {
        <sj-input
          variant="outlined"
          type="number"
          [usePaint]="'none'"
          [usePadding]="'default'"
          [useRounded]="'default'"
          [fullWidth]="true"
          [sj]="[{ fxGrow: 1, minW: 0 }]"
          [value]="node.value"
          (valueChange)="node.value = toNumber($event); onValueChange()"
        ></sj-input>
        } @case ('boolean') {
        <input
          [sj]="{
            m: 0,
            bg: 'light.light',
            bs: 'none',
            bw: 0,
            w: 'auto',
            minW: 4,
            h: 1.5
          }"
          type="checkbox"
          [(ngModel)]="node.value"
          (ngModelChange)="onValueChange()"
        />
        } @case ('null') {
        <sj-typography variant="span" [sj]="{ c: 'neutral.main' }"
          >null</sj-typography
        >
        } }
      </sj-flex>

      @if ((node.type === 'object' || node.type === 'array') && node.expanded) {
      <sj-flex
        [sj]="[
          sj.fxDir(sj.fxDir.options.column),
          sj.pl(1.25),
          sj.borderLeftStyle('solid'),
          sj.borderLeftWidth(0.1),
          sj.borderLeftColor(sj.palette.light.dark),
          sj.w('100%')
        ]"
      >
        @for (child of (node.children ?? []); track child.key) {
        <app-json-node
          [node]="child"
          (update)="onUpdate($event)"
          (remove)="onRemove($event)"
        ></app-json-node>
        }
      </sj-flex>
      }
    </sj-flex>
  `,
  styles: [],
})
export class JsonNodeComponent {
  readonly sj: SjRootApi = sj;

  @Input({ required: true }) node!: JsonNode;
  @Input() isRoot = false;
  @Output() update = new EventEmitter<JsonNode>();
  @Output() remove = new EventEmitter<JsonNode>();

  toggle(evt?: Event) {
    try {
      evt?.stopPropagation();
    } catch {}
    const updated: JsonNode = {
      ...this.node,
      expanded: !this.node.expanded,
      children: this.node.children ? [...this.node.children] : undefined,
    };
    this.node = updated;
    this.update.emit(updated);
  }

  onValueChange() {
    this.update.emit(this.node);
  }

  onUpdate(childNode: JsonNode) {
    if (!this.node.children) return;
    const childIndex = this.node.children.findIndex(
      (c) => c.key === childNode.key
    );
    if (childIndex > -1) {
      const newChildren = [...this.node.children];
      newChildren[childIndex] = childNode;
      const updated: JsonNode = { ...this.node, children: newChildren };
      this.node = updated;
      this.update.emit(updated);
    }
  }

  onRemove(childNode: JsonNode) {
    if (!this.node.children) return;
    const newChildren = this.node.children.filter(
      (c) => c.key !== childNode.key
    );
    const updated: JsonNode = { ...this.node, children: newChildren };
    this.node = updated;
    this.update.emit(updated);
  }

  addNode() {
    const existing = this.node.children ?? [];
    const nextChild: JsonNode =
      this.node.type === 'object'
        ? { key: 'new_key', value: 'new_value', type: 'string', expanded: true }
        : {
            key: existing.length.toString(),
            value: 'new_value',
            type: 'string',
            expanded: true,
          };
    const newChildren = [...existing, nextChild];
    const updated: JsonNode = { ...this.node, children: newChildren };
    this.node = updated;
    this.update.emit(updated);
  }

  removeNode() {
    this.remove.emit(this.node);
  }

  // Basic hex color detection (#RGB or #RRGGBB)
  isHexColor(val: any): boolean {
    if (typeof val !== 'string') return false;
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val.trim());
  }

  toNumber(val: string): number {
    const n = Number(val);
    return Number.isFinite(n) ? n : 0;
  }
}
