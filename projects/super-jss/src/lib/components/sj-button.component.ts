import { ChangeDetectionStrategy, Component, Input, effect } from '@angular/core';
import { SjPaperComponent } from './sj-paper.component';
import { sjButton, SjButtonApi } from '../blueprints/button';
import { SjStyle, SjPalette } from '../models/interfaces';
import type { SjInput } from '../directives/sj.directive';
import { SjButtonVariant } from '../models/variants';
import { SjThemeService } from '../services';

@Component({
  selector: 'sj-button',
  standalone: true,
  imports: [SjPaperComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sj-paper
      [host]="true"
      variant="flat"
      [usePadding]="useDensity"
      [useRounded]="useRounded"
      [sj]="hostSj"
    >
      <ng-content></ng-content>
    </sj-paper>
  `,
})
export class SjButtonComponent {
  sjButton = sjButton;

  // Visual variant: legacy names + new simplified ones
  @Input() variant: SjButtonVariant | 'filled' | 'flat' = 'filled';

  // Surface density level; forwarded to SjPaper host surface
  @Input() useDensity: 1 | 2 | 3 | 4 = 2;
  // Optional user overrides to merge after the variant
  @Input() sj: SjInput | undefined;

  // Additional sugars consistent with flex/paper philosophy
  @Input() useFullWidth = false;
  @Input() usePaint: string | 'auto' | 'none' | undefined;
  @Input() useRounded:
    | 1
    | 2
    | 3
    | 4
    | 'compact'
    | 'default'
    | 'comfortable'
    | 'spacious'
    | 'none'
    | true
    | ''
    | undefined = 2;

  constructor(private themeService: SjThemeService) {
    effect(() => {
      this.themeService.themeVersion();
    });
  }

  get selectedSj(): (overrides?: Partial<SjStyle>) => SjStyle {
    // Map new simplified variants first; fallback to legacy blueprint variants
    const v = this.variant as string;
    if (v === 'filled' || v === 'outlined' || v === 'flat') {
      return (overrides: Partial<SjStyle> = {}): SjStyle => ({
        ...this.baseButtonStyles(),
        ...this.variantStyles(v as any),
        ...overrides,
      });
    }
    return this.pickLegacyVariant(this.sjButton);
  }

  private pickLegacyVariant(
    api: SjButtonApi
  ): (overrides?: Partial<SjStyle>) => SjStyle {
    switch (this.variant) {
      case 'light':
        return api.light;
      case 'contained':
        return api.contained;
      case 'outlined':
        return api.outlined;
      case 'containedPrimary':
        return api.containedPrimary;
      case 'containedLight':
        return api.containedLight;
      case 'containedDark':
        return api.containedDark;
      case 'containedSecondary':
        return api.containedSecondary;
      case 'danger':
        return api.danger;
      case 'default':
      default:
        return api;
    }
  }

  // Minimal common button behaviors; surfaces provide padding/radius
  private baseButtonStyles(): SjStyle {
    return {
      display: 'inline-flex',
      fxAItems: 'center',
      fxJustify: 'center',
      textDecoration: 'none',
      cursor: 'pointer',
      userSelect: 'none',
      minWidth: 'fit-content',
      transform: 'translateY(0)',
      '&:hover': { transform: 'translateY(-1px)' },
      '&:active': { transform: 'translateY(0)' },
      '&:focus-visible': {
        outline: '2px solid rgba(33, 150, 243, 0.55)',
        outlineOffset: '2px',
      },
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.6,
        pointerEvents: 'none',
        boxShadow: 'none',
      },
      // Persistent selection hooks
      '&.active': {},
      '&[aria-current="page"]': {},
      '&.selected': {},
    } as SjStyle;
  }

  private variantStyles(
    kind: 'filled' | 'outlined' | 'flat'
  ): SjStyle {
    const color: keyof SjPalette = 'primary';
    if (kind === 'filled') {
      return {
        backgroundColor: `${color}.main`,
        color: `${color}.contrast`,
        borderStyle: 'solid',
        borderWidth: 0.1,
        borderColor: 'transparent',
        '&:hover': { backgroundColor: `${color}.dark` },
        '&:focus-visible': { outlineColor: `${color}.main` },
        '&:disabled': {
          backgroundColor: `${color}.main`,
          borderColor: 'transparent',
        },
        '&.active': {
          backgroundColor: `${color}.dark`,
          transform: 'translateY(-1px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.20)',
        },
        '&[aria-current="page"]': {
          backgroundColor: `${color}.dark`,
          transform: 'translateY(-1px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.20)',
        },
        '&.selected': {
          backgroundColor: `${color}.dark`,
          transform: 'translateY(-1px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.20)',
        },
      } as SjStyle;
    }
    if (kind === 'outlined') {
      return {
        backgroundColor: 'transparent',
        color: `${color}.dark`,
        borderStyle: 'solid',
        borderWidth: 0.1,
        borderColor: `${color}.main`,
        '&:hover': { backgroundColor: 'light.main' },
        '&:focus-visible': { outlineColor: `${color}.main` },
        '&:disabled': { borderColor: `${color}.main`, color: 'neutral.dark' },
        '&.active': {
          backgroundColor: 'light.main',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        },
        '&[aria-current="page"]': {
          backgroundColor: 'light.main',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        },
        '&.selected': {
          backgroundColor: 'light.main',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        },
      } as SjStyle;
    }
    // flat
    return {
      backgroundColor: 'transparent',
      color: `${color}.main`,
      borderStyle: 'solid',
      borderWidth: 0.1,
      borderColor: 'transparent',
      '&:hover': { backgroundColor: 'light.main' },
      '&:focus-visible': { outlineColor: `${color}.main` },
      '&:disabled': { color: 'neutral.dark' },
      '&.active': {
        backgroundColor: 'light.main',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      },
      '&[aria-current="page"]': {
        backgroundColor: 'light.main',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      },
      '&.selected': {
        backgroundColor: 'light.main',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      },
    } as SjStyle;
  }

  // Compose variant base with user-provided overrides so user wins
  get hostSj(): SjInput {
    const base = () => {
      // Variant + base layout
      let style = { ...this.baseButtonStyles(), ...this.selectedSj() } as SjStyle;
      // Apply fullWidth (also switch to block-level flex so width:100% takes effect)
      if (this.useFullWidth) {
        (style as any).width = '100%';
        (style as any).display = 'flex';
      }
      // Apply paint semantics depending on the current variant
      if (this.usePaint && this.usePaint !== 'none' && this.usePaint !== 'auto') {
        const fam = String(this.usePaint) as keyof SjPalette;
        // Normalize kind to our simplified set; treat unknowns as 'filled'
        const v = String(this.variant);
        const kind: 'filled' | 'outlined' | 'flat' =
          v === 'outlined' ? 'outlined' : v === 'flat' ? 'flat' : 'filled';

        if (kind === 'filled') {
          (style as any).backgroundColor = `${fam}.main`;
          (style as any).color = `${fam}.contrast`;
          (style as any).borderColor = 'transparent';
          // keep existing hover/focus/disabled behaviors but tint them
          const hov = ((style as any)['&:hover'] as any) || {};
          ((style as any)['&:hover'] as any) = { ...hov, backgroundColor: `${fam}.dark` };
          const foc = ((style as any)['&:focus-visible'] as any) || {};
          ((style as any)['&:focus-visible'] as any) = { ...foc, outlineColor: `${fam}.main` };
          const dis = ((style as any)['&:disabled'] as any) || {};
          ((style as any)['&:disabled'] as any) = { ...dis, backgroundColor: `${fam}.main`, borderColor: 'transparent' };
        } else if (kind === 'outlined') {
          (style as any).backgroundColor = 'transparent';
          (style as any).color = `${fam}.main`;
          (style as any).borderStyle = 'solid';
          (style as any).borderWidth = 0.1;
          (style as any).borderColor = `${fam}.main`;
          const hov = ((style as any)['&:hover'] as any) || {};
          ((style as any)['&:hover'] as any) = { ...hov, backgroundColor: 'light.main' };
          const foc = ((style as any)['&:focus-visible'] as any) || {};
          ((style as any)['&:focus-visible'] as any) = { ...foc, outlineColor: `${fam}.main` };
          const dis = ((style as any)['&:disabled'] as any) || {};
          ((style as any)['&:disabled'] as any) = { ...dis, borderColor: `${fam}.main`, color: 'neutral.dark' };
        } else {
          // flat: paint only affects text color
          (style as any).color = `${fam}.main`;
          const foc = ((style as any)['&:focus-visible'] as any) || {};
          ((style as any)['&:focus-visible'] as any) = { ...foc, outlineColor: `${fam}.main` };
          const hov = ((style as any)['&:hover'] as any) || {};
          ((style as any)['&:hover'] as any) = { ...hov, backgroundColor: 'light.main' };
        }
      }
      const theme = this.themeService.sjTheme();
      const surfaces = (theme as any).components?.surfaces ?? {};
      const toLevel = (val: any): 1 | 2 | 3 | 4 | undefined => {
        if (val === undefined || val === null) return undefined;
        if (val === true || val === 'true' || val === '') return 2;
        if (typeof val === 'number') {
          const n = Math.max(1, Math.min(4, Math.round(val)));
          return n as 1 | 2 | 3 | 4;
        }
        const m: Record<string, 1 | 2 | 3 | 4> = {
          compact: 1,
          default: 2,
          comfortable: 3,
          spacious: 4,
        } as const;
        return m[String(val).toLowerCase()] ?? undefined;
      };
      // No default inner gap; authors can set [sj].gap or use surface map explicitly later if desired
      return style;
    };
    const user = this.sj;
    if (user === undefined) return base;
    return Array.isArray(user) ? [base, ...user] : [base, user];
  }
}
