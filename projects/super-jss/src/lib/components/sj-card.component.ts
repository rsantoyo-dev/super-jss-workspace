import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SjPaperComponent } from './sj-paper.component';
import type { SjInput } from '../directives/sj.directive';

/**
 * A card is a container for content.
 *
 * If you make a card interactive (e.g., by adding a click handler),
 * you must make it accessible.
 *
 * @example
 * <!-- For navigation -->
 * <a href="/details" style="text-decoration: none;">
 *   <sj-card variant="interactive">
 *     ...
 *   </sj-card>
 * </a>
 *
 * <!-- For an action -->
 * <sj-card variant="interactive" role="button" tabindex="0" (click)="doSomething()">
 *   ...
 * </sj-card>
 */
@Component({
  selector: 'sj-card',
  standalone: true,
  imports: [SjPaperComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sj-paper
      [host]="true"
      [variant]="variant === 'outlined' ? 'outlined' : (variant === 'flat' ? 'flat' : 'outlined')"
      [usePaint]="usePaint"
      [usePadding]="usePadding"
      [useRounded]="useRounded"
      [sj]="paperSj"
    >
      <ng-content></ng-content>
    </sj-paper>
  `,
})
export class SjCardComponent {
  @Input() variant: 'flat' | 'outlined' | 'elevated' | 'interactive' = 'flat';
  @Input() usePaint: string | 'auto' | 'none' = 'auto';
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
  @Input() sj: SjInput | undefined;

  get paperSj(): SjInput | undefined {
    // Add interactive hover affordance without introducing flex props
    const interactive =
      this.variant === 'interactive'
        ? [{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }, { '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(0,0,0,0.20)' } }]
        : undefined;
    if (!interactive) return this.sj;
    if (!this.sj) return interactive as any;
    return Array.isArray(this.sj)
      ? [...interactive as any[], ...this.sj]
      : [...(interactive as any[]), this.sj];
  }
}
