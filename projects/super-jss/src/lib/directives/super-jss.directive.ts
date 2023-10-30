import { Directive, Input, SimpleChanges, ViewContainerRef, effect, signal } from '@angular/core';
import { SJss } from "../model";
import { SJssThemeService } from "../services";
import { applyStylesToElement, applyTypography } from "./helpers";
import { defaultThemeConfig } from '../themes';

export const theme = signal(defaultThemeConfig())
@Directive({
  selector: "[sj]"
})
export class SuperJssDirective {

  sjInput= signal<SJss>({});

  @Input() set sj(value: SJss) {
    this.sjInput.set(value);
  }

  constructor(private themeService: SJssThemeService, private vcr: ViewContainerRef) {
    effect(() => {
      const el: HTMLElement = this.vcr.element.nativeElement;
      applyTypography(el, theme(), this.themeService.innerWidth());
      applyStylesToElement(el, this.sjInput(), theme(), this.themeService.innerWidth());
    });
  }

   ngOnChanges(changes: SimpleChanges) {
    if (changes.sj) {
      this.sjInput.set(changes.sj.currentValue);
    }
  } 

}
