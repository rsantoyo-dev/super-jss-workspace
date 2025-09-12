import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SjDirective, SjStyle, sjCard } from 'super-jss';

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
  imports: [FormsModule, JsonNodeComponent, SjDirective],
  template: `
    <div [sj]="styles.node">
      <div [sj]="styles.row">
        @if ((node.type === 'object' || node.type === 'array') && (node.children?.length ?? 0) > 0) {
          <button [sj]="togglingBtnSj" (click)="toggle()">
            <small [sj]="{ c: 'primary.light' }">{{ node.expanded ? '/' : '>' }}</small>
          </button>
        } @else {
          <span [sj]="styles.toggleSpacer"></span>
        }
        <span (click)="toggle()" [sj]="styles.key">{{ node.key }}:</span>

        @switch (node.type) {
          @case ('string') {
            @if (isHexColor(node.value)) {
              <span [sj]="styles.colorRow">
                <input [sj]="colorInputSj" type="color" [(ngModel)]="node.value" (ngModelChange)="onValueChange()" />
                <input [sj]="inputSj" type="text" [(ngModel)]="node.value" (ngModelChange)="onValueChange()" />
              </span>
            } @else {
              <input [sj]="inputSj" type="text" [(ngModel)]="node.value" (ngModelChange)="onValueChange()" />
            }
          }
          @case ('number') {
            <input [sj]="inputSj" type="number" [(ngModel)]="node.value" (ngModelChange)="onValueChange()" />
          }
          @case ('boolean') {
            <input [sj]="inputSj" type="checkbox" [(ngModel)]="node.value" (ngModelChange)="onValueChange()" />
          }
          @case ('null') {
            <span [sj]="{ c: 'neutral' }">null</span>
          }
        }
      </div>

      @if ((node.type === 'object' || node.type === 'array') && node.expanded) {
        <div [sj]="styles.children">
          @for (child of (node.children ?? []); track $index) {
            <app-json-node [node]="child" (update)="onUpdate($event)" (remove)="onRemove($event)"></app-json-node>
          }
          <button [sj]="sjCard.interactive({ padding: '2px 6px', bg: 'transparent', c: 'primary' })" (click)="addNode()">+</button>
        </div>
      }
    </div>
  `,
  styles: [],
})
export class JsonNodeComponent {
  public sjCard = sjCard;
  inputSj: SjStyle = {
    m: 0,
    bg: 'bg.primary',
    border: 'none',
    w: 'auto',
    minW: '60px',
    h: '24px',
  };
  colorInputSj: SjStyle = sjCard.flat({
    padding: '0',
    bg: 'transparent',
    border: 'none',
    w: 2,
    h: 2,
    cursor: 'pointer',
  });
  readonly styles = {
    node: { ml: 0.5 } as SjStyle,
    row: { d: 'flex', fxAItems: 'center', gap: 0.5 } as SjStyle,
    key: { cursor: 'pointer' } as SjStyle,
    children: { pl: '20px', bl: '1px solid', bc: 'light.dark' } as SjStyle,
    colorRow: { d: 'inline-flex', fxAItems: 'center', gap: 0.5 } as SjStyle,
    colorSwatch: {
      w: '14px',
      h: '14px',
      b: '1px solid',
      bc: 'light.dark',
      brad: '2px',
      d: 'inline-block',
    } as SjStyle,
    toggleSpacer: { d: 'inline-block', w: 2, h: 2 } as SjStyle,
  };
  togglingBtnSj: SjStyle = sjCard.outlined({
    padding: '2px 6px',
    bg: 'light',
    c: 'secondary',
    d: 'inline',
    bc: 'light',
    borderWidth: '1px',
  });

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
