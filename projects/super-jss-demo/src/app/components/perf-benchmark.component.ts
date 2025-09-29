import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective, sj, WithSj, SjTypographyComponent } from 'super-jss';

@Component({
  selector: 'app-perf-benchmark',
  standalone: true,
  imports: [CommonModule, SjDirective, SjTypographyComponent],
  template: `
    <div [sj]="[sj.flex.column(), sj.css.gap(1)]">
      <sj-typography variant="h3" [sj]="[sj.css.margin(0), sj.css.padding(0)]">
        SJSS 1,000 elements demo
      </sj-typography>
      <sj-typography variant="small" [sj]="[sj.css.opacity(0.8)]">
        Renders 1,000 boxes styled via [sj]. Styles use tokens to avoid
        excessive unique rules.
      </sj-typography>

      <div
        [sj]="[
          sj.grid.container(),
          sj.grid.columns({
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)'
          }),
          sj.css.gap(0.5)
        ]"
      >
        @for (item of items(); track item) {
        <div
          [sj]="[
            sj.flex.column({ gap: 0.25 }),
            sj.css.borderRadius(0.5),
            sj.css.padding(0.5),
            sj.css.backgroundColor(sj.tokens.palette.light.light),
            sj.css.boxShadow('0 1px 3px rgba(0,0,0,0.08)'),
            sj.hover({ boxShadow: '0 3px 8px rgba(0,0,0,0.18)' })
          ]"
        >
          <sj-typography
            variant="strong"
            [sj]="[sj.css.color(sj.tokens.palette.primary.dark)]"
            >Item {{ item }}</sj-typography
          >
          <sj-typography
            variant="span"
            [sj]="[
              sj.css.color(sj.tokens.palette.neutral.dark),
              sj.css.fontSize(0.9)
            ]"
            >Styled by SJSS</sj-typography
          >
          <div [sj]="[sj.flex.row({ fxAItems: 'center', gap: 0.25 })]">
            <sj-typography
              variant="span"
              [sj]="[
                sj.css.width(0.5),
                sj.css.height(0.5),
                sj.css.borderRadius(999),
                sj.css.backgroundColor(sj.tokens.colors.blue[500])
              ]"
            ></sj-typography>
            <sj-typography
              variant="span"
              [sj]="[
                sj.css.width(0.5),
                sj.css.height(0.5),
                sj.css.borderRadius(999),
                sj.css.backgroundColor(sj.tokens.colors.orange[500])
              ]"
            ></sj-typography>

            <sj-typography
              variant="span"
              [sj]="[
                sj.css.width(0.5),
                sj.css.height(0.5),
                sj.css.borderRadius(999),
                sj.css.backgroundColor(sj.tokens.colors.green[500])
              ]"
            ></sj-typography>
          </div>
        </div>
        }
      </div>
    </div>
  `,
})
export class PerfBenchmarkComponent extends WithSj {
  override sj: typeof sj = sj;
  readonly items = signal<number[]>(
    Array.from({ length: 1000 }, (_, i) => i + 1)
  );
}
