import { SjCardComponent, SjDirective, SjHostComponent, SjTheme, WithSj } from "super-jss";
import { JsonStudioComponent } from "../sj-json-studio/json-studio.component";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-theming',
  imports: [CommonModule, SjDirective, SjCardComponent, SjHostComponent, JsonStudioComponent],
  template: `
    <sj-host [sj]="sj.css.padding({ xs: 0.5, md: 1 })">
      <sj-card [variant]="sj.variants.sjCard.flat" [sj]="[]">
        <div [sj]="[ sj.flex.direction('row'), sj.flex.justify('space-between'), sj.css.alignItems('center') ]">
          <h2 [sj]="[ sj.css.margin(0) ]">Theming</h2>
          <div [sj]="[ sj.flex.direction('row'), sj.css.gap(0.5) ]">
            <button [disabled]="!pendingThemePatch" (click)="discardEditedTheme()" [sj]="sj.blueprints.sjButton()">Discard</button>
            <button [disabled]="!pendingThemePatch" (click)="applyEditedTheme()" [sj]="sj.blueprints.sjButton.containedPrimary()">Apply</button>
          </div>
        </div>

        <app-json-studio [value]="themeData" (valueChange)="onStudioChange($event)"></app-json-studio>
      </sj-card>
    </sj-host>
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
