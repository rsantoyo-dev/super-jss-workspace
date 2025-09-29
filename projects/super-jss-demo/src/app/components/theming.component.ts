import {
  SjCardComponent,
  SjDirective,
  SjTheme,
  WithSj,
  SjBoxComponent,
  SjTypographyComponent,
} from 'super-jss';
import { JsonStudioComponent } from '../sj-json-studio/json-studio.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  ],
  template: `
    <app-section title="Theming">
      <sj-card [variant]="sj.variants.sjCard.flat" [sj]="[]">
        <sj-box
          [sj]="[
            sj.flex.direction('row'),
            sj.flex.justify('space-between'),
            sj.css.alignItems('center')
          ]"
        >
          <sj-typography variant="h2" [sj]="[sj.css.margin(0)]"
            >Theming</sj-typography
          >
          <sj-box [sj]="[sj.flex.direction('row'), sj.css.gap(0.5)]">
            <button
              [disabled]="!pendingThemePatch"
              (click)="discardEditedTheme()"
              [sj]="sj.blueprints.sjButton()"
            >
              Discard
            </button>
            <button
              [disabled]="!pendingThemePatch"
              (click)="applyEditedTheme()"
              [sj]="sj.blueprints.sjButton.containedPrimary()"
            >
              Apply
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
export class ThemingComponent extends WithSj {
  themeData: SjTheme;
  pendingThemePatch: Partial<SjTheme> | null = null;

  constructor() {
    super();
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
