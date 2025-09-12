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
    <div class="node">
      <span (click)="toggle()" class="key">{{ node.key }}:</span>

      @switch (node.type) { @case ('object') { @if (node.expanded) {
      <div class="children">
        @for (child of (node.children ?? []); track $index) {
        <app-json-node
          [node]="child"
          (update)="onUpdate($event)"
          (remove)="onRemove($event)"
        >
        </app-json-node>
        }
        <button
          [sj]="
            sjCard.interactive({
              padding: '2px 6px',
              bg: 'transparent',
              c: 'primary'
            })
          "
          (click)="addNode()"
        >
          +
        </button>
      </div>
      } } @case ('array') { @if (node.expanded) {
      <div class="children">
        @for (child of (node.children ?? []); track $index) {
        <app-json-node
          [node]="child"
          (update)="onUpdate($event)"
          (remove)="onRemove($event)"
        >
        </app-json-node>
        }
        <button (click)="addNode()">+</button>
      </div>
      } } @case ('string') { @if (isHexColor(node.value)) {
      <span class="color-row">
        <span class="color-swatch" [style.background]="node.value"></span>
        <input
          [sj]="inputSj"
          type="color"
          [(ngModel)]="node.value"
          (ngModelChange)="onValueChange()"
        />
        <input
          [sj]="inputSj"
          type="text"
          [(ngModel)]="node.value"
          (ngModelChange)="onValueChange()"
        />
      </span>
      } @else {
      <input
        [sj]="inputSj"
        type="text"
        [(ngModel)]="node.value"
        (ngModelChange)="onValueChange()"
      />
      } } @case ('number') {
      <input
        [sj]="inputSj"
        type="number"
        [(ngModel)]="node.value"
        (ngModelChange)="onValueChange()"
      />
      } @case ('boolean') {
      <input
        [sj]="inputSj"
        type="checkbox"
        [(ngModel)]="node.value"
        (ngModelChange)="onValueChange()"
      />
      } @default {
      {{ node.value }}
      } } @if (!isRoot) {
      <button
        [sj]="
          sjCard.interactive({
            padding: '2px 6px',
            bg: 'transparent',
            c: 'secondary',
            d: 'inline'
          })
        "
        (click)="removeNode()"
      >
        -
      </button>
      }
    </div>
  `,
  styles: [
    `
      .node {
        margin-left: 20px;
      }
      .key {
        cursor: pointer;
      }
      .children {
        padding-left: 20px;
        border-left: 1px solid #ccc;
      }
      .color-row {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .color-swatch {
        width: 14px;
        height: 14px;
        border: 1px solid #ccc;
        border-radius: 2px;
        display: inline-block;
      }
    `,
  ],
})
export class JsonNodeComponent {
  public sjCard = sjCard;
  inputSj: SjStyle = {
    mx: 0.5,
    my: 0.2,
    bg: 'transparent',
    border: 'none',
  };

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
