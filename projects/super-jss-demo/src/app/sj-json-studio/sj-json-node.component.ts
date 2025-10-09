import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SjDirective, SjFlexComponent, SjButtonComponent, SjTypographyComponent, sj, SjRootApi } from 'super-jss';

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
  ],
  template: `
    <sj-flex [sj]="[sj.fxDir(sj.fxDir.options.column), sj.ml(0.5)]">
      <sj-flex
        [sj]="[
          sj.d(sj.d.options.flex),
          sj.fxDir(sj.fxDir.options.row),
          sj.alignItems(sj.alignItems.options.center),
          sj.gap(0.5)
        ]"
      >
        @if ((node.type === 'object' || node.type === 'array') &&
        (node.children?.length ?? 0) > 0) {
        <sj-button
          [variant]="sj.sjButton.variants.outlined"
          [sj]="{ px: 0.25, py: 0.1 }"
          (click)="toggle()"
        >
          <sj-typography
            variant="small"
            [sj]="{ c: sj.palette.primary.light }"
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
          (click)="toggle()"
          [sj]="sj.cursor('pointer')"
          >{{ node.key }}:</sj-typography
        >

        @switch (node.type) { @case ('string') { @if (isHexColor(node.value)) {
        <sj-typography
          variant="span"
          [sj]="[
            sj.display('inline-flex'),
            sj.alignItems(sj.alignItems.options.center),
            sj.gap(0.5)
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
          <input
            [sj]="{
              m: 0,
              bg: sj.palette.light.light,
              bs: 'none',
              bw: 0,
              w: 'auto',
              minW: 4,
              h: 1.5
            }"
            type="text"
            [(ngModel)]="node.value"
            (ngModelChange)="onValueChange()"
          />
        </sj-typography>
        } @else {
        <input
          [sj]="{
            m: 0,
            bg: sj.palette.light.light,
            bs: 'none',
            bw: 0,
            w: 'auto',
            minW: 4,
            h: 1.5
          }"
          type="text"
          [(ngModel)]="node.value"
          (ngModelChange)="onValueChange()"
        />
        } } @case ('number') {
        <input
          [sj]="{
            m: 0,
            bg: sj.palette.light.light,
            bs: 'none',
            bw: 0,
            w: 'auto',
            minW: 4,
            h: 1.5
          }"
          type="number"
          [(ngModel)]="node.value"
          (ngModelChange)="onValueChange()"
        />
        } @case ('boolean') {
        <input
          [sj]="{
            m: 0,
            bg: sj.palette.light.light,
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
        <sj-typography variant="span" [sj]="{ c: sj.palette.neutral.main }"
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
          sj.borderLeftColor(sj.palette.light.dark)
        ]"
      >
        @for (child of (node.children ?? []); track $index) {
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
  // All styling is inline via [sj]

  @Input({ required: true }) node!: JsonNode;
  @Input() isRoot = false;
  @Output() update = new EventEmitter<JsonNode>();
  @Output() remove = new EventEmitter<JsonNode>();

  toggle() {
    this.node.expanded = !this.node.expanded;
    this.update.emit(this.node);
  }

  onValueChange() {
    this.update.emit(this.node);
  }

  onUpdate(childNode: JsonNode) {
    const childIndex = this.node.children?.findIndex(
      (c) => c.key === childNode.key
    );
    if (childIndex !== undefined && childIndex > -1 && this.node.children) {
      this.node.children[childIndex] = childNode;
      this.update.emit(this.node);
    }
  }

  onRemove(childNode: JsonNode) {
    const childIndex = this.node.children?.findIndex(
      (c) => c.key === childNode.key
    );
    if (childIndex !== undefined && childIndex > -1 && this.node.children) {
      this.node.children.splice(childIndex, 1);
      this.update.emit(this.node);
    }
  }

  addNode() {
    if (!this.node.children) {
      this.node.children = [];
    }
    if (this.node.type === 'object') {
      this.node.children.push({
        key: 'new_key',
        value: 'new_value',
        type: 'string',
        expanded: true,
      });
    } else if (this.node.type === 'array') {
      this.node.children.push({
        key: this.node.children.length.toString(),
        value: 'new_value',
        type: 'string',
        expanded: true,
      });
    }
    this.update.emit(this.node);
  }

  removeNode() {
    this.remove.emit(this.node);
  }

  // Basic hex color detection (#RGB or #RRGGBB)
  isHexColor(val: any): boolean {
    if (typeof val !== 'string') return false;
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val.trim());
  }
}
