import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SjDirective, SjBoxComponent, WithSj, SjButtonComponent } from 'super-jss';

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
  imports: [FormsModule, JsonNodeComponent, SjDirective, SjBoxComponent, SjButtonComponent],
  template: `
    <sj-box [sj]="[ sj.css.flexDirection(sj.tokens.flex.direction.column), sj.sh.ml(0.5) ]">
      <sj-box [sj]="[ sj.flex.row(), sj.css.alignItems('center'), sj.css.gap(0.5) ]">
        @if ((node.type === 'object' || node.type === 'array') &&
        (node.children?.length ?? 0) > 0) {
        <sj-button [variant]="sj.variants.sjButton.outlined" [sj]="{ px: 0.25, py: 0.1 }" (click)="toggle()">
          <small [sj]="{ c: sj.tokens.palette.primary.light }">{{ node.expanded ? '/' : '>' }}</small>
        </sj-button>
        } @else {
        <span [sj]="{ d: 'inline-block', w: 2, h: 2 }"></span>
        }
        <span (click)="toggle()" [sj]="sj.css.cursor('pointer')">{{ node.key }}:</span>

        @switch (node.type) { @case ('string') { @if (isHexColor(node.value)) {
        <span [sj]="[ sj.css.display('inline-flex'), sj.css.alignItems('center'), sj.css.gap(0.5) ]">
          <input
            [sj]="{ p: 0, bg: sj.tokens.colors.transparent, bs: sj.tokens.border.style.none, bw: 0, w: 2, h: 2, cursor: 'pointer' }"
            type="color"
            [(ngModel)]="node.value"
            (ngModelChange)="onValueChange()"
          />
          <input
            [sj]="{ m: 0, bg: sj.tokens.palette.light.light, bs: sj.tokens.border.style.none, bw: 0, w: sj.tokens.sizing.width.auto, minW: 4, h: 1.5 }"
            type="text"
            [(ngModel)]="node.value"
            (ngModelChange)="onValueChange()"
          />
        </span>
        } @else {
        <input
          [sj]="{ m: 0, bg: sj.tokens.palette.light.light, bs: sj.tokens.border.style.none, bw: 0, w: sj.tokens.sizing.width.auto, minW: 4, h: 1.5 }"
          type="text"
          [(ngModel)]="node.value"
          (ngModelChange)="onValueChange()"
        />
        } } @case ('number') {
        <input
          [sj]="{ m: 0, bg: sj.tokens.palette.light.light, bs: sj.tokens.border.style.none, bw: 0, w: sj.tokens.sizing.width.auto, minW: 4, h: 1.5 }"
          type="number"
          [(ngModel)]="node.value"
          (ngModelChange)="onValueChange()"
        />
        } @case ('boolean') {
        <input
          [sj]="{ m: 0, bg: sj.tokens.palette.light.light, bs: sj.tokens.border.style.none, bw: 0, w: sj.tokens.sizing.width.auto, minW: 4, h: 1.5 }"
          type="checkbox"
          [(ngModel)]="node.value"
          (ngModelChange)="onValueChange()"
        />
        } @case ('null') {
        <span [sj]="{ c: sj.tokens.palette.neutral.main }">null</span>
        } }
      </sj-box>

      @if ((node.type === 'object' || node.type === 'array') && node.expanded) {
      <sj-box [sj]="[
        sj.css.flexDirection(sj.tokens.flex.direction.column),
        sj.sh.pl(1.25),
        sj.css.borderLeftStyle('solid'),
        sj.css.borderLeftWidth(0.1),
        sj.css.borderLeftColor(sj.tokens.palette.light.dark)
      ]">
        @for (child of (node.children ?? []); track $index) {
        <app-json-node
          [node]="child"
          (update)="onUpdate($event)"
          (remove)="onRemove($event)"
        ></app-json-node>
        }
      </sj-box>
      }
    </sj-box>
  `,
  styles: [],
})
export class JsonNodeComponent extends WithSj {
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
