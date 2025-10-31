import { Component, EventEmitter, Input, Output } from '@angular/core';
import { sjButton, sjCard, SjStyle, sj, SjFlexComponent, SjTypographyComponent, SjButtonComponent } from 'super-jss';

@Component({
  selector: 'app-panel-header',
  standalone: true,
  imports: [SjFlexComponent, SjTypographyComponent, SjButtonComponent],
  template: `
    <sj-flex
      [sj]="
        sjCard.primary({
          fxJustify: 'space-between',
          fxDir: 'row',
          fxAItems: 'center'
        })
      "
    >
      <!-- Removed sj-stack; use sj-flex or delete placeholder -->
      <sj-flex [sj]="left">
        <sj-typography
          variant="small"
          [sj]="{ c: sj.palette.primary.contrast }"
          >{{ title }}</sj-typography
        >
        @if (viewMode) {
        <sj-flex [sj]="toggleGroup">
          <sj-button
            [variant]="'flat'"
            [useDensity]="1"
            [useRounded]="'compact'"
            [usePaint]="viewMode === 'tree' ? 'secondary' : 'primary'"
            [sj]="{ fontSize: 0.75 }"
            (click)="onToggle('tree')"
            title="Tree view"
            aria-label="Tree view"
          >
            Tree
          </sj-button>
          <sj-button
            [variant]="'flat'"
            [useDensity]="1"
            [useRounded]="'compact'"
            [usePaint]="viewMode === 'raw' ? 'secondary' : 'primary'"
            [sj]="{ fontSize: 0.75 }"
            (click)="onToggle('raw')"
            title="Raw view"
            aria-label="Raw view"
          >
            Raw
          </sj-button>
        </sj-flex>
        }
      </sj-flex>

      <sj-flex [sj]="right">
        <sj-button
          [variant]="'flat'"
          [useDensity]="1"
          [useRounded]="'compact'"
          [usePaint]="'primary'"
          [sj]="mode === 'collapsed' ? { opacity: 0.6, pointerEvents: 'none' } : { fontSize: 0.75 }"
          (click)="collapse.emit()"
          title="Collapse"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="18" width="16" height="2" rx="1" />
          </svg>
        </sj-button>
        <sj-button
          [variant]="'flat'"
          [useDensity]="1"
          [useRounded]="'compact'"
          [usePaint]="'primary'"
          [sj]="mode === 'normal' ? { opacity: 0.6, pointerEvents: 'none' } : { fontSize: 0.75 }"
          (click)="normal.emit()"
          title="Expand (300px)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="6" width="14" height="12" rx="2" />
          </svg>
        </sj-button>
        @if (viewMode !== 'raw') {
        <sj-button
          [variant]="'flat'"
          [useDensity]="1"
          [useRounded]="'compact'"
          [usePaint]="'primary'"
          [sj]="mode === 'full' ? { opacity: 0.6, pointerEvents: 'none' } : { fontSize: 0.75 }"
          (click)="full.emit()"
          title="Full (auto height)"
          aria-label="Full"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4H4v4h2V6h2V4zm8 0v2h2v2h2V4h-4zM4 16v4h4v-2H6v-2H4zm16 0h-2v2h-2v2h4v-4z" />
          </svg>
        </sj-button>
        }
      </sj-flex>
    </sj-flex>
  `,
})
export class PanelHeaderComponent {
  sjCard = sjCard;
  sjButton = sjButton;
  sj = sj;
  @Input() title = '';
  @Output() collapse = new EventEmitter<void>();
  @Output() normal = new EventEmitter<void>();
  @Output() full = new EventEmitter<void>();
  @Input() viewMode: 'tree' | 'raw' | null = null;
  @Output() viewModeChange = new EventEmitter<'tree' | 'raw'>();
  @Input() mode: 'collapsed' | 'normal' | 'full' = 'normal';

  container: SjStyle = sjCard({
    d: 'flex',
    fxJustify: 'space-between',
    fxAItems: 'center',
    h: 2,
    p: 1,
    bg: 'primary.main',
    c: 'primary.contrast',
    m: 0,
    bs: 'none',
    bw: 0,
  });

  left: SjStyle = { d: 'flex', gap: 0.5, fxAItems: 'center' };
  right: SjStyle = { d: 'flex', gap: 0.25, fxAItems: 'center' };

  iconBtn: SjStyle = sjButton.outlined({
    bg: 'light.main',
    c: 'primary.main',
    px: 0.5,
    py: 0.25,
    brad: 0.25,
    cursor: 'pointer',
    border: '1px solid',
    bc: 'primary.light',
  });

  toggleGroup: SjStyle = { d: 'flex', gap: 0.25, ml: 0.5 } as any;

  toggleBtn(active: boolean): SjStyle {
    return sjButton({
      bg: active ? 'secondary.main' : 'primary.light',
      c: active ? 'secondary.contrast' : 'primary.contrast',
      px: 0.75,
      py: 0.25,
      brad: 0.25,
      cursor: 'pointer',
      border: 'none',
      fontSize: '12px',
      fontWeight: '500',
    });
  }

  onToggle(mode: 'tree' | 'raw') {
    if (this.viewMode !== mode) this.viewModeChange.emit(mode);
  }
}
