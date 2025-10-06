import { ChangeDetectionStrategy, Component, Input, computed, ChangeDetectorRef, effect } from '@angular/core';
import { SjStyle } from '../models/interfaces';
import { createSjTypographyApi, SjTypographyApi } from '../blueprints/typography';
import { SjTypographyVariant } from '../models/variants';
import { SjThemeService } from '../services';
import { SjHostComponent } from './sj-host.component';
import type { SjInput } from '../directives/sj.directive';

@Component({
  selector: 'sj-typography',
  template: `<sj-host [sj]="hostSj"><ng-content></ng-content></sj-host>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SjHostComponent],
})
export class SjTypographyComponent {
  @Input() variant: SjTypographyVariant = 'default';
  @Input() sj: SjInput | undefined;

  private sjTypographyApi = computed(() => createSjTypographyApi(this.themeService.sjTheme()));

  constructor(private themeService: SjThemeService, private cdr: ChangeDetectorRef) {
    // Ensure OnPush host bindings refresh when theme changes
    effect(() => {
      this.themeService.themeVersion();
      this.cdr.markForCheck();
    });
  }

  get selectedSj(): (overrides?: Partial<SjStyle>) => SjStyle {
    return this.pickVariant(this.sjTypographyApi());
  }

  private pickVariant(api: SjTypographyApi): (overrides?: Partial<SjStyle>) => SjStyle {
    switch (this.variant) {
      case 'h1': return api.h1;
      case 'h2': return api.h2;
      case 'h3': return api.h3;
      case 'h4': return api.h4;
      case 'h5': return api.h5;
      case 'h6': return api.h6;
      case 'p': return api.p;
      case 'span': return api.span;
      case 'strong': return api.strong;
      case 'body': return api.body;
      case 'caption': return api.caption;
      case 'small': return api.small;
      case 'pre': return api.pre;
      case 'default':
      default: return api;
    }
  }

  // Compose variant base with user-provided overrides so user wins
  get hostSj(): SjInput {
    // Read themeVersion so Angular re-evaluates this binding on theme changes
    // ensuring fresh styles even if the input reference is otherwise stable.
    this.themeService.themeVersion();
    // Normalize selected variant to a zero-arg producer for SjInput
    const base = () => this.selectedSj();
    const user = this.sj;
    if (user === undefined) return base;
    return Array.isArray(user) ? [base, ...user] : [base, user];
  }
}
