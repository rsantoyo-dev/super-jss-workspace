import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sj, SjTypographyComponent, SjFlexComponent, SjCardComponent, SjRootApi } from 'super-jss';

@Component({
  selector: 'app-perf-benchmark',
  standalone: true,
  imports: [CommonModule, SjTypographyComponent, SjFlexComponent, SjCardComponent],
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

    <sj-flex [sj]="rootStyle">
      <sj-typography variant="h3" [sj]="[sj.margin(0), sj.padding(0)]">
        SJSS {{ itemsCount() }} elements demo
      </sj-typography>
      <sj-typography variant="small" [sj]="[sj.opacity(0.8)]">
        Renders {{ itemsCount() }} boxes styled via [sj]. Styles use tokens to
        avoid excessive unique rules.
      </sj-typography>
      <sj-card [sj]="[sj.flexDirection('row')]">
        <button (click)="setMode('sj')" [disabled]="mode() === 'sj'">
          SJSS mode
        </button>
        <button (click)="setMode('css')" [disabled]="mode() === 'css'">
          CSS mode
        </button>
      </sj-card>

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
          <sj-flex [sj]="containerStyle">
            <ng-container *ngFor="let item of items(); trackBy: trackByFn">
              <sj-flex [sj]="cardStyle">
                <sj-typography variant="strong" [sj]="strongStyle"
                  >Item {{ item }}</sj-typography
                >
                <!-- per-item dynamic text removed; count-only benchmark -->
                <sj-typography variant="span" [sj]="spanStyle"
                  >Styled by SJSS</sj-typography
                >
                <sj-flex [sj]="dotsRow">
                  <sj-typography variant="span" [sj]="dotBlue"></sj-typography>
                  <sj-typography
                    variant="span"
                    [sj]="dotOrange"
                  ></sj-typography>
                  <sj-typography variant="span" [sj]="dotGreen"></sj-typography>
                </sj-flex>
              </sj-flex>
            </ng-container>
          </sj-flex>
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
    </sj-flex>
  `,
})
export class PerfBenchmarkComponent {
  readonly sj: SjRootApi = sj;
  // Precomputed SJSS styles to avoid creating new objects inside the loop
  readonly rootStyle = [
    sj.d(sj.d.options.flex),
    sj.fxDir(sj.fxDir.options.column),
    sj.gap(1),
  ];

  readonly containerStyle = [
    sj.d(sj.d.options.grid),
    sj.gridTemplateColumns({
      xs: '1fr',
      md: 'repeat(2, 1fr)',
      lg: 'repeat(4, 1fr)',
    }),
    sj.gap(0.5),
  ];

  readonly cardStyle = [
    sj.d(sj.d.options.flex),
    sj.fxDir(sj.fxDir.options.column),
    sj.gap(0.25),
    sj.borderRadius(0.5),
    sj.padding(0.5),
    sj.backgroundColor(sj.palette.light.light),
    sj.boxShadow('0 1px 3px rgba(0,0,0,0.08)'),
    // sj.hover({ boxShadow: '0 3px 8px rgba(0,0,0,0.18)' }),
  ];

  readonly strongStyle = [sj.color(sj.palette.primary.dark)];

  readonly spanStyle = [sj.color(sj.palette.neutral.dark), sj.fontSize(0.9)];

  readonly dotsRow = [
    sj.d(sj.d.options.flex),
    sj.fxDir(sj.fxDir.options.row),
    sj.fxAItems(sj.fxAItems.options.center),
    sj.gap(0.25),
  ];

  readonly dotBlue = [
    sj.width(0.5),
    sj.height(0.5),
    sj.borderRadius(999),
    sj.backgroundColor('blue.500'),
  ];

  readonly dotOrange = [
    sj.width(0.5),
    sj.height(0.5),
    sj.borderRadius(999),
    sj.backgroundColor('orange.500'),
  ];

  readonly dotGreen = [
    sj.width(0.5),
    sj.height(0.5),
    sj.borderRadius(999),
    sj.backgroundColor('green.500'),
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
