import {
  Component,
  effect,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  SJ_BASE_COMPONENTS_IMPORTS,
  SjPalette,
  SjThemeService,
  SjTypography,
  sj,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-drawer',
  imports: [SJ_BASE_COMPONENTS_IMPORTS],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <sj-typography [variant]="'h1'">Home</sj-typography> `,
})
export class DrawerComponent {
  private themeService = inject(SjThemeService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      this.themeService.sjTheme();
      this.cdr.markForCheck();
    });
  }

  // expose sj to template
  readonly sj = sj;
}
