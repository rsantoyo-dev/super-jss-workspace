import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SjStyle, SjTheme } from '../models/interfaces';
import { CssGenerator } from '../core/css-generator';

@Injectable({
  providedIn: 'root',
})
export class SjCssGeneratorService {
  private generatedClasses = new Set<string>();
  private renderer: Renderer2;
  private styleEl: HTMLStyleElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.styleEl = this.renderer.createElement('style');
    this.renderer.setAttribute(this.styleEl, 'data-sjss', '');
    this.renderer.appendChild(this.document.head, this.styleEl);
  }

  public getOrGenerateClasses(styles: SjStyle, theme: SjTheme, version = 0): string[] {
    const cssGenerator = new CssGenerator(theme);
    const cssMap = cssGenerator.generateAtomicCss(styles);
    const prefix = version > 0 ? `v${version}-` : '';
    const classes: string[] = [];
    let newCss = '';

    for (const [className, cssRule] of cssMap) {
      const prefixedClass = `${prefix}${className}`;
      const prefixedRule = cssRule.split(`.${className}`).join(`.${prefixedClass}`);
      if (!this.generatedClasses.has(prefixedClass)) {
        this.generatedClasses.add(prefixedClass);
        newCss += prefixedRule + '\n';
      }
      classes.push(prefixedClass);
    }

    if (newCss) {
      const cssText = this.renderer.createText(newCss);
      this.renderer.appendChild(this.styleEl, cssText);
    }

    return classes;
  }

  public clearCache() {
    this.generatedClasses.clear();
    this.renderer.removeChild(this.document.head, this.styleEl);
    this.styleEl = this.renderer.createElement('style');
    this.renderer.setAttribute(this.styleEl, 'data-sjss', '');
    this.renderer.appendChild(this.document.head, this.styleEl);
  }
}
