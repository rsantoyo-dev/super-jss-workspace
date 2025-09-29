import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  sj,
  WithSj,
  SjTypographyComponent,
  SjBoxComponent,
} from 'super-jss';

@Component({
  selector: 'app-perf-benchmark',
  standalone: true,
  imports: [CommonModule, SjDirective, SjTypographyComponent, SjBoxComponent],
  template: `
    <style>
      .perf-css-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 8px;
      }

      .perf-card {
        display: flex;
        flex-direction: column;
        width: 200px;
        padding: 16px;
        margin: 8px;
        border-radius: 10px;
        background: linear-gradient(180deg, #fbfdff 0%, #ffffff 100%);
        border: 1px solid rgba(16, 24, 40, 0.04);
        box-shadow: 0 1px 4px rgba(2, 6, 23, 0.06);
        transition: box-shadow 160ms ease, transform 120ms ease;
      }

      .perf-card:hover {
        box-shadow: 0 8px 24px rgba(2, 6, 23, 0.12);
        transform: translateY(-2px);
      }

      .perf-card strong {
        font-size: 14px;
        color: #10203a;
      }

      .perf-card .meta {
        color: #61748a;
        font-size: 13px;
        margin-top: 6px;
      }

      .dots {
        display: flex;
        gap: 8px;
        margin-top: 10px;
        align-items: center;
      }

      .dot {
        width: 16px;
        height: 16px;
        border-radius: 999px;
        box-shadow: 0 1px 2px rgba(2, 6, 23, 0.08) inset;
      }

      .dot.blue {
        background: #1e88e5;
      }
      .dot.orange {
        background: #fb8c00;
      }
      .dot.green {
        background: #43a047;
      }

      .chip-row {
        display: flex;
        gap: 8px;
        margin-top: 10px;
      }

      .chip {
        background: rgba(14, 50, 120, 0.06);
        color: #16325c;
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 8px;
      }
    </style>

    <sj-box [sj]="rootStyle">
      <sj-typography variant="h3" [sj]="[sj.css.margin(0), sj.css.padding(0)]">
        SJSS {{ itemsCount() }} elements demo
      </sj-typography>
      <sj-typography variant="small" [sj]="[sj.css.opacity(0.8)]">
        Renders {{ itemsCount() }} boxes styled via [sj]. Styles use tokens to
        avoid excessive unique rules.
      </sj-typography>
      <div style="display:flex; gap:8px; margin-top:12px;">
        <button (click)="setMode('sj')" [disabled]="mode() === 'sj'">
          SJSS mode
        </button>
        <button (click)="setMode('css')" [disabled]="mode() === 'css'">
          CSS mode
        </button>
      </div>

      <div
        style="margin-top:12px; display:flex; gap:12px; align-items:center; flex-wrap:wrap;"
      >
        <label for="perf-input">Items to render:</label>
        <input
          id="perf-input"
          type="number"
          [value]="itemsCount()"
          (input)="setCount(+($any($event.target).value || 0))"
          min="0"
          max="20000"
        />
        <small style="color:#61748a">(updates count immediately)</small>

        <div
          style="margin-left:12px; display:flex; gap:8px; align-items:center;"
        >
          <span style="color:#61748a; font-size:13px">Presets:</span>
          <button (click)="setCount(500)">500</button>
          <button (click)="setCount(1000)">1,000</button>
          <button (click)="setCount(5000)">5,000</button>
        </div>
      </div>

      <div style="margin-top:12px">
        <div *ngIf="mode() === 'sj'">
          <sj-box [sj]="containerStyle">
            <ng-container *ngFor="let item of items(); trackBy: trackByFn">
              <sj-box [sj]="cardStyle">
                <sj-typography variant="strong" [sj]="strongStyle"
                  >Item {{ item }}</sj-typography
                >
                <!-- per-item dynamic text removed; count-only benchmark -->
                <sj-typography variant="span" [sj]="spanStyle"
                  >Styled by SJSS</sj-typography
                >
                <sj-box [sj]="dotsRow">
                  <sj-typography variant="span" [sj]="dotBlue"></sj-typography>
                  <sj-typography
                    variant="span"
                    [sj]="dotOrange"
                  ></sj-typography>
                  <sj-typography variant="span" [sj]="dotGreen"></sj-typography>
                </sj-box>
              </sj-box>
            </ng-container>
          </sj-box>
        </div>

        <div *ngIf="mode() === 'css'">
          <div class="perf-css-grid">
            <div
              *ngFor="let item of items(); trackBy: trackByFn"
              class="perf-card"
            >
              <strong>Item {{ item }}</strong>
              <div class="meta">
                Pure CSS card — static styles, colors & shadow
              </div>
              <!-- per-item dynamic text removed; count-only benchmark -->

              <div class="dots">
                <span class="dot blue" aria-hidden="true"></span>
                <span class="dot orange" aria-hidden="true"></span>
                <span class="dot green" aria-hidden="true"></span>
              </div>

              <div class="chip-row">
                <span class="chip">Primary</span>
                <span class="chip">Neutral</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </sj-box>
  `,
})
export class PerfBenchmarkComponent extends WithSj {
  override sj: typeof sj = sj;
  // Precomputed SJSS styles to avoid creating new objects inside the loop
  readonly rootStyle = [sj.flex.column(), sj.css.gap(1)];

  readonly containerStyle = [
    sj.grid.container(),
    sj.grid.columns({ xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }),
    sj.css.gap(0.5),
  ];

  readonly cardStyle = [
    sj.flex.column({ gap: 0.25 }),
    sj.css.borderRadius(0.5),
    sj.css.padding(0.5),
    sj.css.backgroundColor(sj.tokens.palette.light.light),
    sj.css.boxShadow('0 1px 3px rgba(0,0,0,0.08)'),
    sj.hover({ boxShadow: '0 3px 8px rgba(0,0,0,0.18)' }),
  ];

  readonly strongStyle = [sj.css.color(sj.tokens.palette.primary.dark)];

  readonly spanStyle = [
    sj.css.color(sj.tokens.palette.neutral.dark),
    sj.css.fontSize(0.9),
  ];

  readonly dotsRow = [sj.flex.row({ fxAItems: 'center', gap: 0.25 })];

  readonly dotBlue = [
    sj.css.width(0.5),
    sj.css.height(0.5),
    sj.css.borderRadius(999),
    sj.css.backgroundColor(sj.tokens.colors.blue[500]),
  ];

  readonly dotOrange = [
    sj.css.width(0.5),
    sj.css.height(0.5),
    sj.css.borderRadius(999),
    sj.css.backgroundColor(sj.tokens.colors.orange[500]),
  ];

  readonly dotGreen = [
    sj.css.width(0.5),
    sj.css.height(0.5),
    sj.css.borderRadius(999),
    sj.css.backgroundColor(sj.tokens.colors.green[500]),
  ];
  // Dynamic count presets: default to 1000
  readonly itemsCount = signal<number>(1000);
  readonly items = computed(() =>
    Array.from({ length: this.itemsCount() }, (_, i) => i + 1)
  );
  readonly mode = signal<'sj' | 'css'>('sj');

  // no per-item text; count-only benchmark

  setCount(n: number) {
    this.itemsCount.set(n);
  }

  setMode(m: 'sj' | 'css') {
    this.mode.set(m);
  }

  trackByFn(_: number, item: number) {
    return item;
  }
}
