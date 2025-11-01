import {
  SJ_BASE_COMPONENTS_IMPORTS,
  SjDirective,
  SjTheme,
  sj,
  SjRootApi,
  SjThemeService,
  deepMerge,
} from 'super-jss';
import { DemoItemComponent } from './demo-item.component';
import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { JsonStudioComponent } from '../sj-json-studio/json-studio.component';
import { SectionContainerComponent } from './section-container.component';
// Using custom JsonStudioComponent for theme editing

@Component({
  standalone: true,
  selector: 'app-theming',
  imports: [
    CommonModule,
    SjDirective,
    SectionContainerComponent,
    JsonStudioComponent,
    ...SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <app-section title="Theming">
      <sj-paper variant="flat" usePadding="default">
        <app-json-studio
          [value]="data"
          (valueChange)="getData($event)"
        ></app-json-studio>
      </sj-paper>
    </app-section>
  `,
})
export class ThemingComponent {
  readonly sj: SjRootApi = sj;
  readonly theme = inject(SjThemeService);
  themeData: SjTheme;
  pendingThemePatch: Partial<SjTheme> | null = null;
  private applyTimer: any = null;
  private readonly autoApplyDelayMs = 2000;
  private lastAppliedJson = '';
  codeThemeSnippet: string = `// TypeScript: update theme at runtime\nthis.theme.setTheme({ palette: { primary: { main: 'purple' } } });`;

  // JsonStudioComponent configuration and backing data
  public data: any;
  @ViewChild(JsonStudioComponent, { static: false })
  editor!: JsonStudioComponent;

  constructor() {
    this.themeData = this.theme.sjTheme();
    try { this.lastAppliedJson = JSON.stringify(this.themeData); } catch { this.lastAppliedJson = ''; }
    // Initialize editor data with current theme (deep clone to avoid accidental mutation)
    try {
      this.data = JSON.parse(JSON.stringify(this.themeData));
    } catch {
      this.data = this.themeData;
    }
  }

  onStudioChange(patch: Partial<SjTheme>) {
    // Merge incremental patch into pending/full theme snapshot
    this.pendingThemePatch = deepMerge(this.pendingThemePatch || this.themeData, patch as any);
    this.scheduleAutoApply();
  }

  applyEditedTheme() {
    if (this.applyTimer) clearTimeout(this.applyTimer);
    if (!this.pendingThemePatch) return;
    const json = safeStringify(this.pendingThemePatch);
    if (json && json !== this.lastAppliedJson) {
      this.theme.setTheme(this.pendingThemePatch as any);
      this.themeData = this.theme.sjTheme();
      this.lastAppliedJson = safeStringify(this.themeData) || json;
    }
    this.pendingThemePatch = null;
  }

  discardEditedTheme() {
    if (this.applyTimer) clearTimeout(this.applyTimer);
    this.pendingThemePatch = null;
  }

  // JsonStudioComponent change handler
  getData(updated: any) {
    // Full updated theme object from editor
    this.pendingThemePatch = updated as Partial<SjTheme>;
    this.data = updated;
    this.scheduleAutoApply();
  }

  private scheduleAutoApply() {
    if (this.applyTimer) clearTimeout(this.applyTimer);
    this.applyTimer = setTimeout(() => {
      if (!this.pendingThemePatch) return;
      const json = safeStringify(this.pendingThemePatch);
      if (json && json !== this.lastAppliedJson) {
        this.theme.setTheme(this.pendingThemePatch as any);
        this.themeData = this.theme.sjTheme();
        this.lastAppliedJson = safeStringify(this.themeData) || json;
      }
      this.pendingThemePatch = null;
    }, this.autoApplyDelayMs);
  }
}

// Safe stringify helper that tolerates non-serializable values
function safeStringify(v: any): string | '' {
  try { return JSON.stringify(v); } catch { return ''; }
}
