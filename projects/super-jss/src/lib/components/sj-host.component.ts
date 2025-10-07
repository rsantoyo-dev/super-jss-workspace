import { AfterContentInit, Component, ElementRef, Renderer2, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { SjDirective } from '../directives/sj.directive';
import { SjCssGeneratorService, SjThemeService } from '../services';

/**
 * Lightweight host element that forwards `[sj]` styles to its surrounding parent.
 * Useful when the consumer is dynamically instantiating a component and needs a
 * dedicated hook to apply Super JSS styles without introducing extra DOM wrappers.
 */
@Component({
  selector: 'sj-host',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class SjHostComponent extends SjDirective implements AfterContentInit, OnChanges {

  constructor(
    viewContainerRef: ViewContainerRef,
    elementRef: ElementRef<HTMLElement>,
    themeService: SjThemeService,
    cssGenerator: SjCssGeneratorService,
    renderer: Renderer2,
  ) {
    super(viewContainerRef, elementRef, themeService, cssGenerator, renderer);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  ngAfterContentInit(): void {
    const host = this.el.nativeElement;
    const parent = host.parentElement;

    if (!parent) {
      return;
    }

    while (host.firstChild) {
      parent.insertBefore(host.firstChild, host);
    }

    parent.removeChild(host);

    this.el = new ElementRef(parent as HTMLElement);
    this.renderStyles();
  }
}
