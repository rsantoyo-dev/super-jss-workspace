import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, effect } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SjIconName, icon, renderIcon, SjIconOptions } from '../icons';
import { SjThemeService } from '../services';
import { resolveThemeColor } from '../core/core-methods';

@Component({
  selector: 'sj-icon',
  standalone: true,
  template: `
    <span
      class="sj-icon"
      [attr.role]="role"
      [attr.aria-hidden]="ariaHidden ? 'true' : null"
      [attr.aria-label]="ariaHidden ? null : label"
      [innerHTML]="svg"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.display]': `'inline-flex'`,
    '[style.line-height]': `'0'`,
    '[style.width]': 'size',
    '[style.height]': 'size',
  },
})
export class SjIconComponent implements OnChanges {
  static icon = icon;

  @Input() name: SjIconName = 'sun';
  @Input() size: string | number = '1.5rem';
  @Input() ariaHidden = true;
  @Input() role: string | null = null;
  @Input() label: string | null = null;
  @Input() fill?: string;
  @Input() stroke?: string;
  @Input() fillOpacity?: number;
  @Input() strokeOpacity?: number;

  svg: SafeHtml | null = null;

  constructor(private readonly sanitizer: DomSanitizer, private readonly themeService: SjThemeService) {
    effect(() => {
      this.themeService.themeVersion();
      this.updateSvg();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size']) {
      this.normalizeSize();
    }

    if (
      changes['name'] ||
      changes['fill'] ||
      changes['stroke'] ||
      changes['fillOpacity'] ||
      changes['strokeOpacity']
    ) {
      this.updateSvg();
    }

    if (!this.svg) {
      this.updateSvg();
    }
  }

  private updateSvg(): void {
    this.svg = this.getSafeSvg(this.name);
  }

  private normalizeSize(): void {
    if (typeof this.size === 'number') {
      this.size = `${this.size}px`;
    }
  }

  private getSafeSvg(iconName: SjIconName): SafeHtml {
    const options: SjIconOptions = {
      fill: this.normalizeColor(this.fill),
      stroke: this.normalizeColor(this.stroke),
      fillOpacity: this.fillOpacity,
      strokeOpacity: this.strokeOpacity,
    };
    const svg = renderIcon(iconName, options);
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  private normalizeColor(value?: string): string | undefined {
    if (!value) {
      return undefined;
    }

    return resolveThemeColor(value, this.themeService.sjTheme());
  }
}
