import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SjStyle, SjTheme } from '../models/interfaces';
import { CssGenerator } from '../core/css-generator';

@Injectable()
export class SjCssGeneratorService {
  private cache = new Map<string, string[]>();
  private renderer: Renderer2;

  constructor(@Inject(DOCUMENT) private document: Document, private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public getOrGenerateClasses(styles: SjStyle, theme: SjTheme): string[] {
    const styleKey = JSON.stringify(styles);
    if (this.cache.has(styleKey)) {
      return this.cache.get(styleKey)!;
    }

    const cssGenerator = new CssGenerator(theme);
    const [classes, css] = cssGenerator.generateAtomicCss(styles);
    
    const styleEl = this.renderer.createElement('style');
    this.renderer.setAttribute(styleEl, 'data-sjss', '');
    const cssText = this.renderer.createText(css);
    this.renderer.appendChild(styleEl, cssText);
    this.renderer.appendChild(this.document.head, styleEl);

    this.cache.set(styleKey, classes);
    return classes;
  }

  public clearCache() {
    this.cache.clear();
    // We also need to remove the generated <style> tags from the DOM
    const styleTags = this.document.head.querySelectorAll('style[data-sjss]');
    styleTags.forEach(tag => this.renderer.removeChild(this.document.head, tag));
  }
}
