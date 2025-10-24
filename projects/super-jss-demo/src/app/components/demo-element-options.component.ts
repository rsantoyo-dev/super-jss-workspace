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
    ...SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <app-section title="SjRootApi Showcase">
      <!-- Hero: primary bg + contrast text with hover darkening -->
      <!-- TODO: CHECK padding to have the ability to get theme densities. -->
      <div
        [sj]="[
          sj.d(sj.display.options.flex),
          sj.fxDir(sj.flexDirection.options.column),
          sj.fxAItems(sj.alignItems.options.center),
          sj.fxJustify(sj.justifyContent.options.center),
          sj.gap(sj.gap.options.default),
          sj.p(sj.padding.options.default),
          sj.brad(sj.borderRadius.options.default),
          sj.bg(sj.palette.primary.main),
          sj.c(sj.palette.primary.contrast),
          sj.hover([sj.bg(sj.palette.primary.dark)])
        ]"
      >
        <sj-typography variant="strong">SJSS · sjRootApi</sj-typography>
        <sj-typography variant="small" [sj]="[sj.opacity(0.9)]">
          Tokens, responsive objects, and pseudo‑selectors — inline.
        </sj-typography>

        <div
          [sj]="[
            sj.d('flex'),
            sj.fxDir('row'),
            sj.gap(0.5),
            sj.mt(0.5)
          ]"
        >
          <a
            href="https://sjss.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            [sj]="[
              sj.c(sj.palette.primary.contrast),
              sj.opacity(0.95),
              sj.textDecoration('none'),
              sj.hover([ sj.textDecoration('underline'), sj.opacity(1) ])
            ]"
          >Docs</a>
          <a
            href="https://www.npmjs.com/package/super-jss"
            target="_blank"
            rel="noopener noreferrer"
            [sj]="[
              sj.c(sj.palette.primary.contrast),
              sj.opacity(0.95),
              sj.textDecoration('none'),
              sj.hover([ sj.textDecoration('underline'), sj.opacity(1) ])
            ]"
          >npm</a>
        </div>
      </div>

      <!-- Grid of themed examples (all styled via sjRootApi) -->
      <div
        [sj]="[
          sj.mt(1),
          sj.d('grid'),
          sj.gap({ xs: 0.5, md: 1 }),
          sj.gridTemplateColumns({ xs: '1fr', md: 'repeat(2, 1fr)' })
        ]"
      >
        <!-- Interactive card with hover transform/shadow -->
        <div
          [sj]="[
            sj.p(0.75),
            sj.brad(0.5),
            sj.bg(sj.palette.light.main),
            sj.c(sj.palette.dark.main),
            sj.boxShadow('0 2px 10px rgba(0,0,0,0.08)'),
            sj.transition('transform 120ms ease, box-shadow 120ms ease'),
            sj.hover([
              sj.transform('translateY(-2px)'),
              sj.boxShadow('0 10px 24px rgba(0,0,0,0.18)')
            ])
          ]"
        >
          <sj-typography variant="strong" [sj]="sj.m(0)"
            >Interactive card</sj-typography
          >
          <sj-typography variant="small" [sj]="sj.m(0)"
            >Hover me for elevation ✨</sj-typography
          >
        </div>

        <!-- Secondary surface using main/contrast tokens with hover darkening -->
        <div
          [sj]="[
            sj.p(0.75),
            sj.brad(0.5),
            sj.bg(sj.palette.secondary.main),
            sj.c(sj.palette.secondary.contrast),
            sj.hover([sj.bg(sj.palette.secondary.dark)])
          ]"
        >
          <sj-typography variant="strong" [sj]="sj.m(0)"
            >Secondary surface</sj-typography
          >
          <sj-typography variant="small" [sj]="sj.m(0)"
            >Theme tokens for bg/contrast</sj-typography
          >
        </div>

        <!-- Themed button (hover + active) using only sjRootApi -->
        <button
          [sj]="[
            sj.bg(sj.palette.primary.main),
            sj.c(sj.palette.primary.contrast),
            sj.brad(0.5),
            sj.p({ xs: 0.5, md: 0.75 }),
            sj.fontWeight(600),
            sj.cursor('pointer'),
            sj.border('none'),
            sj.transition('background-color 120ms ease, transform 60ms ease'),
            sj.hover([sj.bg(sj.palette.primary.dark)]),
            sj.active([sj.transform('scale(0.98)')])
          ]"
        >
          Themed Button
        </button>

        <!-- Example returning SjStyle[] from TS for clarity -->
        <div [sj]="primaryOutlineStyles()">
          Primary outline from TS (typed SjStyle[])
        </div>
      </div>
    </app-section>
  `,
})
export class DemoElementOptionsComponent {
  readonly sj: SjRootApi = sj;

  // Single typed SjStyle[] example (built via sjRootApi functions only)
  primaryOutlineStyles(): SjStyle[] {
    return [
      this.sj.borderWidth(this.sj.borderWidth.options.default),
      this.sj.borderStyle(this.sj.borderStyle.options.solid),
      this.sj.borderColor(this.sj.palette.primary.main),
      this.sj.brad(0.5),
      this.sj.p(0.5),
      this.sj.bg(this.sj.palette.light.light),
      this.sj.c(this.sj.palette.dark.main),
    ];
  }
}
