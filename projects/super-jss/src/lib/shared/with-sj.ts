import { inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// Internal library imports (no barrel to avoid cycles)
import sj, { SjApi } from '../api/sj';
import { SjThemeService } from '../services/sj-theme.service';
import { SjDirective } from '../directives/sj.directive';
import { SjHostComponent } from '../components/sj-host.component';
import { SjCardComponent } from '../components/sj-card.component';
import { SjBoxComponent } from '../components/sj-box.component';
import { SjButtonComponent } from '../components/sj-button.component';
import { SjIconComponent } from '../components/sj-icon.component';

export abstract class WithSj {
  public sj: SjApi = sj;
  public theme: SjThemeService = inject(SjThemeService);

  // Computed helpers
  public themeName = computed(() => this.theme.sjTheme().name);
  public breakpoint = computed(() => this.theme.currentBreakpoint());
  public isMobile = computed(() => this.theme.currentBreakpoint() === 'xs');
  public isTablet = computed(() => this.theme.currentBreakpoint() === 'sm');
  public isDesktop = computed(() => ['md', 'lg', 'xl', 'xxl'].includes(this.theme.currentBreakpoint()));
}

export const SJ_COMMON_IMPORTS = [
  SjDirective,
  SjHostComponent,
] as const;

export const SJ_BASE_COMPONENTS_IMPORTS = [
  SjDirective,
  SjHostComponent,
  SjCardComponent,
  SjBoxComponent,
  SjButtonComponent,
  SjIconComponent
] as const;
