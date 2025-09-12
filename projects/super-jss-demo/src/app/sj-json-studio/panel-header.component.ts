import { Component, EventEmitter, Input, Output } from '@angular/core';
import { sjCard, SjDirective, SjStyle } from 'super-jss';

@Component({
  selector: 'app-panel-header',
  standalone: true,
  imports: [SjDirective],
  template: `
    <div [sj]="container">
      <div [sj]="left">
        <small [sj]>{{ title }}</small>
        @if (viewMode) {
          <div [sj]="toggleGroup">
            <button [sj]="toggleBtn(viewMode === 'tree')" (click)="onToggle('tree')" title="Tree view" aria-label="Tree view">
              <small [sj]>Tree</small>
            </button>
            <button [sj]="toggleBtn(viewMode === 'raw')" (click)="onToggle('raw')" title="Raw view" aria-label="Raw view">
              <small [sj]>Raw</small>
            </button>
          </div>
        }
      </div>
      <div [sj]="right">
        <button [sj]="iconBtn" (click)="collapse.emit()" title="Collapse" aria-label="Collapse" [disabled]="mode === 'collapsed'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="18" width="16" height="2" rx="1" />
          </svg>
        </button>
        <button [sj]="iconBtn" (click)="normal.emit()" title="Expand (300px)" aria-label="Expand" [disabled]="mode === 'normal'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="6" width="14" height="12" rx="2" />
          </svg>
        </button>
        @if (viewMode !== 'raw') {
          <button [sj]="iconBtn" (click)="full.emit()" title="Full (auto height)" aria-label="Full" [disabled]="mode === 'full'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4H4v4h2V6h2V4zm8 0v2h2v2h2V4h-4zM4 16v4h4v-2H6v-2H4zm16 0h-2v2h-2v2h4v-4z" />
            </svg>
          </button>
        }
      </div>
    </div>
  `,
})
export class PanelHeaderComponent {
  @Input() title = '';
  @Output() collapse = new EventEmitter<void>();
  @Output() normal = new EventEmitter<void>();
  @Output() full = new EventEmitter<void>();
  @Input() viewMode: 'tree' | 'raw' | null = null;
  @Output() viewModeChange = new EventEmitter<'tree' | 'raw'>();
  @Input() mode: 'collapsed' | 'normal' | 'full' = 'normal';

  // container: SjStyle = {
  //   d: 'flex',
  //   fxJustify: 'space-between',
  //   fxAItems: 'center',
  //   h: '30px',
  //   p: 0.5,
  //   bg: 'primary.main',
  //   c: 'primary.contrast',
  // };

  container: SjStyle = sjCard({
    d: 'flex',
    fxJustify: 'space-between',
    fxAItems: 'center',
    h: 2,
    p: 1,    
    bg: 'primary.main',
    c: 'primary.contrast',
    m: 0,
    border: 'none',
  });

  left: SjStyle = { d: 'flex', gap: 0.5, fxAItems: 'center' };
  right: SjStyle = { d: 'flex', gap: 0.25, fxAItems: 'center' };

  iconBtn: SjStyle = sjCard.interactive({
    p: 0,
    w: 2.5,
    h: 2,
    d: 'inline-flex',
    fxCenter: true as any,
    bg: 'primary.light',
    c: 'primary.contrast',
    borderColor: 'transparent',
    brad: 0.5,
  });

  toggleGroup: SjStyle = { d: 'flex', gap: 0.25, ml: 0.5 } as any;

  toggleBtn(active: boolean): SjStyle {
    return sjCard.interactive({
      p: 0,
      px: 1,
      h: '100%',
      w: 5,
      borderColor: 'transparent',
      brad: 0.5,
      bg: active ? 'secondary.main' : 'primary.light',
      c: active ? 'secondary.contrast' : 'primary.contrast',
    });
  }

  onToggle(mode: 'tree' | 'raw') {
    if (this.viewMode !== mode) this.viewModeChange.emit(mode);
  }
}
