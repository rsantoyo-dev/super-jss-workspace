import { Directive, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { SJss } from "../model";
import { SJssThemeService } from "../services";
import { BehaviorSubject, combineLatest, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { applyStylesToElement, applyTypography } from "../helpers";
@Directive({
  selector: "[sj]"
})
export class SuperJssDirective implements OnChanges {
  @Input() set sj(value: SJss) {
    this.sj$.next(value);
  }

  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
  private sj$ = new BehaviorSubject<SJss>([{}]);

  private subscriptions: Subscription = new Subscription();

  constructor(private themeService: SJssThemeService, private vcr: ViewContainerRef) {
    this.subscriptions.add(
      combineLatest([themeService.theme$, this.screenWidth$, this.sj$])
        .pipe(
          tap(([theme, screenWidth, sj]) => {
            const el: HTMLElement = vcr.element.nativeElement;
            applyTypography(el, theme, screenWidth);
            applyStylesToElement(el, sj, theme, screenWidth);
          })
        )
        .subscribe()
    );

    this.subscriptions.add(
      this.themeService.breakpointChanges().subscribe(() => {
        this.screenWidth$.next(window.innerWidth);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sj) {
      this.sj$.next(changes.sj.currentValue);
    }
  }

  // Cleanup: Unsubscribe from all active subscriptions
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
