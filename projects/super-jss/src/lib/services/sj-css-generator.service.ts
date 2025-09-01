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

  public getOrGenerateClasses(styles: SjStyle, theme: SjTheme): string[] {
    const cssGenerator = new CssGenerator(theme);
    const cssMap = cssGenerator.generateAtomicCss(styles);
    const classes = Array.from(cssMap.keys());
    let newCss = '';

    for (const [className, cssRule] of cssMap) {
      if (!this.generatedClasses.has(className)) {
        this.generatedClasses.add(className);
        newCss += cssRule + '\n';
      }
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
