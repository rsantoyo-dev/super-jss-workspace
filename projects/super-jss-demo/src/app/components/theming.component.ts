import {
  SJ_BASE_COMPONENTS_IMPORTS,
  SjDirective,
  SjTheme,
  sj,
  SjRootApi,
  SjThemeService,
} from 'super-jss';
import { DemoItemComponent } from './demo-item.component';
import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { JsonStudioComponent } from '../sj-json-studio/json-studio.component';
import { SectionContainerComponent } from './section-container.component';
// Using custom JsonStudioComponent for theme editing

@Component({
  standalone: true,
  selector: 'app-theming',
  imports: [
    CommonModule,
    SjDirective,
    SectionContainerComponent,
    JsonStudioComponent,
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
          [value]="data"
          (valueChange)="getData($event)"
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

  // JsonStudioComponent configuration and backing data
  public data: any;
  @ViewChild(JsonStudioComponent, { static: false })
  editor!: JsonStudioComponent;

  constructor() {
    this.themeData = this.theme.sjTheme();
    // Initialize editor data with current theme (deep clone to avoid accidental mutation)
    try {
      this.data = JSON.parse(JSON.stringify(this.themeData));
    } catch {
      this.data = this.themeData;
    }
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

  // JsonStudioComponent change handler
  getData(updated: any) {
    this.pendingThemePatch = updated;
    this.data = updated;
  }
}
