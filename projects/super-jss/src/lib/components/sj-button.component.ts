import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SjPaperComponent } from './sj-paper.component';
import { sjButton, SjButtonApi } from '../blueprints/button';
import { SjStyle, SjPalette } from '../models/interfaces';
import type { SjInput } from '../directives/sj.directive';
import { SjButtonVariant } from '../models/variants';

@Component({
  selector: 'sj-button',
  standalone: true,
  imports: [SjPaperComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sj-paper
      [host]="true"
      [useSurface]="true"
      [density]="density"
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
  // Theme color key to use for the variant accents
  @Input() color: keyof SjPalette = 'primary';
  // Surface density level; forwarded to SjPaper host surface
  @Input() density: 1 | 2 | 3 | 4 = 2;
  // Optional user overrides to merge after the variant
  @Input() sj: SjInput | undefined;

  get selectedSj(): (overrides?: Partial<SjStyle>) => SjStyle {
    // Map new simplified variants first; fallback to legacy blueprint variants
    const v = this.variant as string;
    if (v === 'filled' || v === 'outlined' || v === 'flat') {
      return (overrides: Partial<SjStyle> = {}): SjStyle => ({
        ...this.baseButtonStyles(),
        ...this.variantStyles(v as any, this.color),
        ...overrides,
      });
    }
    return this.pickLegacyVariant(this.sjButton);
  }

  private pickLegacyVariant(api: SjButtonApi): (overrides?: Partial<SjStyle>) => SjStyle {
    switch (this.variant) {
      case 'light': return api.light;
      case 'contained': return api.contained;
      case 'outlined': return api.outlined;
      case 'containedPrimary': return api.containedPrimary;
      case 'containedLight': return api.containedLight;
      case 'containedDark': return api.containedDark;
      case 'containedSecondary': return api.containedSecondary;
      case 'danger': return api.danger;
      case 'default':
      default: return api;
    }
  }

  // Minimal common button behaviors; surfaces provide padding/radius
  private baseButtonStyles(): SjStyle {
    return {
      display: 'inline-flex',
      fxAItems: 'center',
      fxJustify: 'center',
      gap: 0.5,
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
    kind: 'filled' | 'outlined' | 'flat',
    color: keyof SjPalette
  ): SjStyle {
    if (kind === 'filled') {
      return {
        backgroundColor: `${color}.main`,
        color: `${color}.contrast`,
        borderStyle: 'solid',
        borderWidth: 0.1,
        borderColor: 'transparent',
        '&:hover': { backgroundColor: `${color}.dark` },
        '&:focus-visible': { outlineColor: `${color}.main` },
        '&:disabled': { backgroundColor: `${color}.main`, borderColor: 'transparent' },
        '&.active': { backgroundColor: `${color}.dark`, transform: 'translateY(-1px)', boxShadow: '0 8px 20px rgba(0,0,0,0.20)' },
        '&[aria-current="page"]': { backgroundColor: `${color}.dark`, transform: 'translateY(-1px)', boxShadow: '0 8px 20px rgba(0,0,0,0.20)' },
        '&.selected': { backgroundColor: `${color}.dark`, transform: 'translateY(-1px)', boxShadow: '0 8px 20px rgba(0,0,0,0.20)' },
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
        '&.active': { backgroundColor: 'light.main', transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' },
        '&[aria-current="page"]': { backgroundColor: 'light.main', transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' },
        '&.selected': { backgroundColor: 'light.main', transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' },
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
      '&.active': { backgroundColor: 'light.main', transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' },
      '&[aria-current="page"]': { backgroundColor: 'light.main', transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' },
      '&.selected': { backgroundColor: 'light.main', transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' },
    } as SjStyle;
  }

  // Compose variant base with user-provided overrides so user wins
  get hostSj(): SjInput {
    const base = () => this.selectedSj();
    const user = this.sj;
    if (user === undefined) return base;
    return Array.isArray(user) ? [base, ...user] : [base, user];
  }
}
