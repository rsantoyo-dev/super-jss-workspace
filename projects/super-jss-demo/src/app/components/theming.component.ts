import {
  SJ_BASE_COMPONENTS_IMPORTS,
  SjDirective,
  SjTheme,
  sj,
  SjRootApi,
  SjThemeService,
} from 'super-jss';
import { DemoItemComponent } from './demo-item.component';
import { JsonStudioComponent } from '../sj-json-studio/json-studio.component';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SectionContainerComponent } from './section-container.component';

@Component({
  standalone: true,
  selector: 'app-theming',
  imports: [
    CommonModule,
    SjDirective,
    JsonStudioComponent,
    SectionContainerComponent,
    ...SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <app-section title="Theming">
      <sj-paper variant="flat" usePadding="default">
        <sj-flex
          [sj]="[
            sj.fxDir(sj.fxDir.options.row),
            sj.justifyContent(sj.justifyContent.options.spaceBetween),
            sj.alignItems(sj.alignItems.options.center)
          ]"
        >
          <sj-typography variant="h2" [sj]="[sj.m(0)]">Theming</sj-typography>
          <sj-flex [sj]="[sj.fxDir(sj.fxDir.options.row), sj.gap(0.5)]">
            <sj-button
              [variant]="'outlined'"
              (click)="discardEditedTheme()"
              [sj]="
                !pendingThemePatch
                  ? { opacity: 0.6, pointerEvents: 'none' }
                  : undefined
              "
            >
              Discard
            </sj-button>
            <sj-button
              [variant]="'filled'"
              color="primary"
              (click)="applyEditedTheme()"
              [sj]="
                !pendingThemePatch
                  ? { opacity: 0.6, pointerEvents: 'none' }
                  : undefined
              "
            >
              Apply
            </sj-button>
          </sj-flex>
        </sj-flex>

        <app-json-studio
          [value]="themeData"
          (valueChange)="onStudioChange($event)"
        ></app-json-studio>
      </sj-paper>
    </app-section>
  `,
})
export class ThemingComponent {
  readonly sj: SjRootApi = sj;
  readonly theme = inject(SjThemeService);
  themeData: SjTheme;
  pendingThemePatch: Partial<SjTheme> | null = null;
  codeThemeSnippet: string = `// TypeScript: update theme at runtime\nthis.theme.setTheme({ palette: { primary: { main: 'purple' } } });`;

  constructor() {
    this.themeData = this.theme.sjTheme();
  }

  onStudioChange(patch: Partial<SjTheme>) {
    this.pendingThemePatch = patch;
  }

  applyEditedTheme() {
    if (this.pendingThemePatch) {
      this.theme.setTheme(this.pendingThemePatch);
      this.pendingThemePatch = null;
      this.themeData = this.theme.sjTheme();
    }
  }

  discardEditedTheme() {
    this.pendingThemePatch = null;
  }
}
