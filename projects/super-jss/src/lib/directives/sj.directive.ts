import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
  effect,
} from "@angular/core";
import { applyResponsiveStyle, applyTypography } from "../core/core-methods";
import { SjStyle } from "../models/interfaces";
import { SjThemeService } from "../services";

/**
 * Directive for applying dynamic styles, implementing SJSS (Super JavaScript Stylesheets) principles.
 * This directive handles responsive and typography styles dynamically.
 */
@Directive({
  standalone: true, // Marks this directive as standalone, not requiring an NgModule.
  selector: '[sj]' // The selector to be used for applying this directive in templates.
})
export class SjDirective implements OnChanges {
  /**
   * The style object or array of style objects to be applied.
   * It can be a single style object or an array of style objects for responsive design.
   */
  @Input() sj: SjStyle | SjStyle[] | undefined;

  /**
   * Constructs the SjDirective.
   *
   * @param vcr The ViewContainerRef provides access to the host element.
   * @param sjt The SjThemeService for accessing theme-related functionalities.
   */
  constructor(public vcr: ViewContainerRef, private sjt: SjThemeService) {
    // Initialize effect to re-render styles when the current breakpoint changes.
    effect(() => {
      if (this.sjt.currentBreakpoint()) {
        this.renderStyles();
      }
    });
  }

  /**
   * Renders the styles on the host element.
   * This method applies both typography and responsive styles.
   */
  private renderStyles(): void {
    // Apply typography styles based on the current theme and window width.
    applyTypography(this.vcr.element.nativeElement, this.sjt.sjTheme(), window.innerWidth);

    // Check if 'sj' input is defined.
    if (this.sj) {
      // Apply responsive styles. If 'sj' is an array, loop through each style object.
      if (Array.isArray(this.sj)) {
        this.sj.forEach(style =>
          applyResponsiveStyle(
            this.vcr.element.nativeElement,
            style as SjStyle,
            window.innerWidth,
            this.sjt.sjTheme()
          )
        );
      } else {
        applyResponsiveStyle(
          this.vcr.element.nativeElement,
          this.sj as SjStyle,
          window.innerWidth,
          this.sjt.sjTheme()
        );
      }
    }
  }

  /**
   * Lifecycle hook that is called when any data-bound property of a directive changes.
   * @param changes Object of changes.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Re-render styles when any @Input properties change.
    this.renderStyles();
  }
}
