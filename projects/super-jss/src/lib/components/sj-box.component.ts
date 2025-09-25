import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { SjStyle } from '../models/interfaces';
import { sjBox } from '../blueprints/box';
import { deepMerge } from '../utils/deep-merge';
import { SjHostComponent } from './sj-host.component';

@Component({
  selector: 'sj-box',
  standalone: true,
  imports: [SjHostComponent],
  template: `
    <sj-host [sj]="computedStyle">
      <ng-content></ng-content>
    </sj-host>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SjBoxComponent {
  computedStyle: SjStyle = sjBox();

  private overrides: Partial<SjStyle> = {};
  private extra: SjStyle | SjStyle[] | null = null;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  @Input()
  set direction(value: SjStyle['fxDir'] | SjStyle['flexDirection'] | undefined) {
    this.setOverride('fxDir', value);
  }

  @Input()
  set justify(value: SjStyle['fxJustify'] | SjStyle['justifyContent'] | undefined) {
    this.setOverride('fxJustify', value);
  }

  @Input()
  set align(value: SjStyle['fxAItems'] | SjStyle['alignItems'] | undefined) {
    this.setOverride('fxAItems', value);
  }

  @Input()
  set wrap(value: SjStyle['fxWrap'] | SjStyle['flexWrap'] | undefined) {
    this.setOverride('fxWrap', value);
  }

  @Input()
  set gap(value: SjStyle['gap'] | undefined) {
    this.setOverride('gap', value);
  }

  @Input()
  set inline(value: boolean | undefined) {
    if (value === undefined || value === null) {
      delete this.overrides.d;
    } else {
      this.overrides.d = value ? 'inline-flex' : 'flex';
    }
    this.updateStyles();
  }

  @Input()
  set styles(value: SjStyle | SjStyle[] | null | undefined) {
    this.extra = value ?? null;
    this.updateStyles();
  }

  private setOverride(key: keyof SjStyle, value: SjStyle[keyof SjStyle] | undefined): void {
    if (value === undefined || value === null) {
      delete this.overrides[key];
    } else {
      this.overrides[key] = value as SjStyle[keyof SjStyle];
    }
    this.updateStyles();
  }

  private updateStyles(): void {
    let merged = sjBox(this.overrides);

    if (this.extra) {
      if (Array.isArray(this.extra)) {
        merged = this.extra.reduce((acc, style) => deepMerge(acc, style), merged);
      } else {
        merged = deepMerge(merged, this.extra);
      }
    }

    this.computedStyle = { ...merged };
    this.cdr.markForCheck();
  }
}
