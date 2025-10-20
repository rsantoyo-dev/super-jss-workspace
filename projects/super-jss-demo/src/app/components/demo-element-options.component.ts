import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjStyle,
  sj,
  SJ_BASE_COMPONENTS_IMPORTS,
  SjRootApi,
} from 'super-jss';
import { SectionContainerComponent } from './section-container.component';

@Component({
  selector: 'app-demo-element-options',
  standalone: true,
  imports: [
    CommonModule,
    SectionContainerComponent,
    SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <app-section title="Dynamic Options">
      <div [sj]="[sj.padding(sj.padding.options.default)]">
        Testing dynamic options...
      </div>

      <!-- Test various CSS properties with dynamic options -->
      <div
        [sj]="[
          sj.margin(sj.margin.options.default),
          sj.padding(sj.padding.options.spacious),
          sj.gap(sj.gap.options.compact),
          sj.borderRadius(sj.borderRadius.options.comfortable),
          sj.display(sj.display.options.flex),
          sj.position(sj.position.options.relative),
          sj.justifyContent(sj.justifyContent.options.center),
          sj.alignItems(sj.alignItems.options.center),
          sj.flexDirection(sj.flexDirection.options.column),
          sj.flexWrap(sj.flexWrap.options.wrap),
          sj.color(sj.color.options.primary.main),
          sj.backgroundColor(sj.backgroundColor.options.secondary.light),
          sj.width(sj.width.options.auto),
          sj.height(sj.height.options.fitContent),
          sj.border('1px solid #ccc')
        ]"
      >
        <h3>Dynamic Options Test</h3>
        <p>This div uses various CSS properties with their .options</p>

        <!-- Showcase expanded color options -->
        <div
          [sj]="[sj.padding(sj.padding.options.default), sj.margin('0.5rem 0')]"
        >
          <div
            [sj]="[
              sj.color(sj.color.options.primary.main),
              sj.backgroundColor(sj.backgroundColor.options.light.main)
            ]"
          >
            Primary text on light background
          </div>
          <div
            [sj]="[
              sj.color(sj.color.options.secondary.contrast),
              sj.backgroundColor(sj.backgroundColor.options.secondary.main)
            ]"
          >
            Secondary contrast text on secondary background
          </div>
          <div
            [sj]="[
              sj.borderColor(sj.borderColor.options.success.main),
              sj.border('2px solid'),
              sj.padding(sj.padding.options.compact)
            ]"
          >
            Success border color
          </div>
          <div
            [sj]="[
              sj.fill(sj.fill.options.warning.main),
              sj.stroke(sj.stroke.options.error.main)
            ]"
            style="width: 50px; height: 50px;"
          >
            SVG fill/stroke colors (applied to SVG elements)
          </div>
        </div>

        <!-- Showcase border width options -->
        <div
          [sj]="[sj.padding(sj.padding.options.default), sj.margin('0.5rem 0')]"
        >
          <h4>Border Width Options:</h4>
          <div
            [sj]="[
              compactPrimaryBorder(),
              sj.padding(sj.padding.options.compact),
              sj.margin('0.25rem')
            ]"
          >
            Compact border (1px)
          </div>
          <div
            [sj]="[
              defaultSecondaryBorder(),
              sj.padding(sj.padding.options.compact),
              sj.margin('0.25rem')
            ]"
          >
            Default border (2px)
          </div>
          <div
            [sj]="[
              comfortableSuccessBorder(),
              sj.padding(sj.padding.options.compact),
              sj.margin('0.25rem')
            ]"
          >
            Comfortable border (3px)
          </div>
          <div
            [sj]="[
              spaciousWarningBorder(),
              sj.padding(sj.padding.options.compact),
              sj.margin('0.25rem')
            ]"
          >
            Spacious border (4px)
          </div>
        </div>

        <div
          [sj]="[
            sj.padding(sj.padding.options.spacious),
            sj.backgroundColor('lightblue')
          ]"
        >
          Nested div with spacious padding
        </div>
      </div>
    </app-section>
  `,
})
export class DemoElementOptionsComponent {
  sj: SjRootApi = sj;

  // Border style methods for clean semantic border definitions
  private createBorderStyle(width: number, color: string): SjStyle {
    return {
      borderWidth: width,
      borderStyle: 'solid',
      borderColor: color,
    };
  }

  compactPrimaryBorder(): SjStyle {
    return this.createBorderStyle(
      this.sj.borderWidth.options.compact,
      this.sj.borderColor.options.primary.main
    );
  }

  defaultSecondaryBorder(): SjStyle {
    return this.createBorderStyle(
      this.sj.borderWidth.options.default,
      this.sj.borderColor.options.secondary.main
    );
  }

  comfortableSuccessBorder(): SjStyle {
    return this.createBorderStyle(
      this.sj.borderWidth.options.comfortable,
      this.sj.borderColor.options.success.main
    );
  }

  spaciousWarningBorder(): SjStyle {
    return this.createBorderStyle(
      this.sj.borderWidth.options.spacious,
      this.sj.borderColor.options.warning.main
    );
  }
}
