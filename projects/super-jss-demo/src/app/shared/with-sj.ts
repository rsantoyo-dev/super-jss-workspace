import { inject } from '@angular/core';
import { sj, SjApi, SjThemeService } from 'super-jss';

export abstract class WithSj {
  public sj: SjApi = sj;
  // Convenience access to the theme service for components/templates
  public theme: SjThemeService = inject(SjThemeService);
}
