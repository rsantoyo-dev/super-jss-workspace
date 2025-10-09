import { SjDirective } from './directives/sj.directive';
import { SjHostComponent } from './components/sj-host.component';
import { SjCardComponent } from './components/sj-card.component';
import { SjPaperComponent } from './components/sj-paper.component';
import { SjBoxComponent } from './components/sj-box.component';
import { SjButtonComponent } from './components/sj-button.component';
import { SjTypographyComponent } from './components/sj-typography.component';
import { SjIconComponent } from './components/sj-icon.component';
import { SjStackComponent } from './components/sj-stack.component';
import { SjFlexComponent } from './components/sj-flex.component';

// Convenience arrays to quickly import common SJ building blocks in components
export const SJ_COMMON_IMPORTS = [SjDirective, SjHostComponent] as const;

export const SJ_BASE_COMPONENTS_IMPORTS = [
  SjDirective,
  SjHostComponent,
  SjCardComponent,
  SjPaperComponent,
  SjStackComponent,
  SjFlexComponent,
  SjBoxComponent,
  SjButtonComponent,
  SjTypographyComponent,
  SjIconComponent,
] as const;
