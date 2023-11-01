import { Directive, Input, ViewContainerRef, effect, signal } from '@angular/core';

import { activeListeners, applyStylesToElement, applyTypography, onResize } from './helpers';
import { theme, innerWidth } from './public-api';
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
      console.log('el', theme().breakpoints);
      applyTypography(el, theme(), innerWidth());
      applyStylesToElement(el, this.sjInput(), theme(), innerWidth());
    });

    effect(() => {
      onResize(theme())
    }, { allowSignalWrites: true });

    if (!activeListeners()) {
      activeListeners.set(true);
      window.addEventListener('resize', () => onResize(theme()));
      window.addEventListener('load', () => onResize(theme()));
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions
    window.removeEventListener('resize', () => onResize(theme()));
    window.removeEventListener('load', () => onResize(theme()));
  }
}
