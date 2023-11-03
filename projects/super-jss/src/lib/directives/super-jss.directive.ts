import { Directive, Input, ViewContainerRef, effect, signal } from '@angular/core';

import { activeListeners, applyStylesToElement, applyTypography, onResize } from './helpers';
import { sjTheme, sjInnerWidth } from './public-api';
import { SJss } from '../model';

@Directive({
  selector: "[sj]"
})
export class SuperJssDirective {
  sjInput = signal<SJss>({});

  @Input() set sj(value: SJss) {
    this.sjInput.set(value);
  }

  constructor(private vcr: ViewContainerRef) {
    effect(() => {
      const el: HTMLElement = this.vcr.element.nativeElement;
      applyTypography(el, sjTheme(), sjInnerWidth());
      applyStylesToElement(el, this.sjInput(), sjTheme(), sjInnerWidth());
    });

    effect(() => {
      onResize(sjTheme())
    }, { allowSignalWrites: true });

    if (!activeListeners()) {
      activeListeners.set(true);
      window.addEventListener('resize', () => onResize(sjTheme()));
      window.addEventListener('load', () => onResize(sjTheme()));
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions
    window.removeEventListener('resize', () => onResize(sjTheme()));
    window.removeEventListener('load', () => onResize(sjTheme()));
  }
}
