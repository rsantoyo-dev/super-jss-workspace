import {
  SjCardComponent,
  SjDirective,
  SjTheme,
  SjBoxComponent,
  SjTypographyComponent,
  sj,
  SjRootApi,
  SjThemeService,
} from 'super-jss';
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
    SjCardComponent,
    JsonStudioComponent,
    SectionContainerComponent,
    SjTypographyComponent,
  ],
  template: `
    <app-section title="Theming">
      <sj-card [variant]="sj.sjCard.variants.flat" [sj]="[]">
        <sj-box
          [sj]="[
            sj.fxDir(sj.fxDir.options.row),
            sj.justifyContent(sj.justifyContent.options.spaceBetween),
            sj.alignItems(sj.alignItems.options.center)
          ]"
        >
          <sj-typography variant="h2" [sj]="[sj.margin(0)]"
            >Theming</sj-typography
          >
          <sj-box [sj]="[sj.fxDir(sj.fxDir.options.row), sj.gap(0.5)]">
            <button
              [disabled]="!pendingThemePatch"
              (click)="discardEditedTheme()"
              [sj]="sj.sjButton()"
            >
              <sj-typography variant="span" [sj]="[]">Discard</sj-typography>
            </button>
            <button
              [disabled]="!pendingThemePatch"
              (click)="applyEditedTheme()"
              [sj]="sj.sjButton.containedPrimary()"
            >
              <sj-typography variant="span" [sj]="[]">Apply</sj-typography>
            </button>
          </sj-box>
        </sj-box>

        <app-json-studio
          [value]="themeData"
          (valueChange)="onStudioChange($event)"
        ></app-json-studio>
      </sj-card>
    </app-section>
  `,
})
export class ThemingComponent {
  readonly sj: SjRootApi = sj;
  readonly theme = inject(SjThemeService);
  themeData: SjTheme;
  pendingThemePatch: Partial<SjTheme> | null = null;

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
