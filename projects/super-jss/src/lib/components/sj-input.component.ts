import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SjPaperComponent } from './sj-paper.component';
import type { SjInput as SjStyleInput } from '../directives/sj.directive';
import { SjStyle } from '../models/interfaces';
 
import { SjDirective } from '../directives/sj.directive';

/**
 * To make this component accessible, you should provide a label and associate it with the input.
 *
 * @example
 * <label for="my-input">My Input</label>
 * <sj-input id="my-input"></sj-input>
 */
@Component({
  selector: 'sj-input',
  standalone: true,
  imports: [SjPaperComponent, SjDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sj-paper
      [host]="true"
      [marker]="'SjInput'"
      [variant]="paperVariant"
      [usePaint]="usePaint"
      [usePadding]="usePadding"
      [useRounded]="useRounded"
      [sj]="containerSj"
    >
      <ng-content select="[prefix]"></ng-content>
      <input
        class="sj-input-native"
        [attr.id]="id"
        [attr.type]="type"
        [disabled]="disabled"
        [attr.placeholder]="placeholder || null"
        [value]="value || ''"
        (input)="onInput($event)"
        [sj]="inputSj"
        [attr.aria-invalid]="invalid ? 'true' : null"
        [attr.aria-describedby]="ariaDescribedby"
        [attr.data-sj-component]="'sj-input-native'"
      />
      <ng-content select="[suffix]"></ng-content>
    </sj-paper>
  `,
})
export class SjInputComponent implements OnInit {
  private static nextId = 0;

  ngOnInit(): void {
    if (!this.id) {
      this.id = `sj-input-${SjInputComponent.nextId++}`;
    }
  }
  // Visual variant
  @Input() variant: 'flat' | 'outlined' | 'filled' = 'outlined';
  @Input() type: 'text' | 'email' | 'password' | 'search' | 'number' | 'url' | 'color' = 'text';

  // Surface sugars
  @Input() usePadding:
    | 1
    | 2
    | 3
    | 4
    | 'compact'
    | 'default'
    | 'comfortable'
    | 'spacious'
    | 'none'
    | undefined;
  @Input() useRounded:
    | 1
    | 2
    | 3
    | 4
    | 'compact'
    | 'default'
    | 'comfortable'
    | 'spacious'
    | 'none'
    | undefined;
  @Input() usePaint: 'none' | 'auto' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'dark' | 'neutral' | 'light' = 'auto';

  // Layout
  @Input() fullWidth = false;

  // State
  @Input() disabled = false;
  @Input() invalid = false;

  // Accessibility
  @Input() id: string | undefined;
  @Input() ariaDescribedby: string | undefined;

  // Value/placeholder
  @Input() placeholder: string | undefined;
  @Input() value: string | undefined;
  @Output() valueChange = new EventEmitter<string>();

  // User style overrides on container (wins last)
  @Input() sj: SjStyleInput | undefined;

  get paperVariant(): 'flat' | 'outlined' | 'filled' {
    return this.variant;
  }

  onInput(evt: Event) {
    const target = evt.target as HTMLInputElement | null;
    if (target) this.valueChange.emit(target.value);
  }

  get containerSj(): SjStyleInput {
    const family = this.usePaint && this.usePaint !== 'none' && this.usePaint !== 'auto' ? String(this.usePaint) : 'primary';
    const focusColor = `${family}.main` as any;
    const invalidColor = `error.main` as any;
    const isOutlined = this.variant === 'outlined';

    const base: any = {
      display: 'flex',
      alignItems: 'center',
      gap: 0.5,
      width: this.fullWidth ? '100%' : undefined,
      '&:focus-within': {
        outline: `2px solid ${focusColor}`,
        outlineOffset: '2px',
      },
    };

    if (this.disabled) {
      base.opacity = 0.6;
      base.pointerEvents = 'none';
      base.boxShadow = 'none';
    }

    if (this.invalid) {
      if (isOutlined) {
        base.borderColor = invalidColor;
      } else {
        base.outline = `2px solid ${invalidColor}`;
        base.outlineOffset = '2px';
      }
    }

    const user = this.sj;
    if (!user) return base;
    return Array.isArray(user) ? [base, ...user] : [base, user];
  }

  get inputSj(): SjStyleInput {
    // Derive placeholder color from usePaint family when available
    const fam = this.usePaint && this.usePaint !== 'none' && this.usePaint !== 'auto' ? String(this.usePaint) : 'neutral';
    const placeholderColor = this.variant === 'filled' ? `${fam}.contrast` : `${fam}.light`;

    const style: any = {
      width: '100%',
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      color: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      padding: 0,
      caretColor: 'inherit',
      '&::placeholder': { color: placeholderColor },
    };
    return style;
  }

}
