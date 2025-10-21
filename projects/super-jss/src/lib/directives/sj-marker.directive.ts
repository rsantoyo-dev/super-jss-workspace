import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[sjMarker]',
})
export class SjMarkerDirective implements OnInit {
  private static _nextId = 1;

  @Input('sjMarker') marker: string | undefined;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const raw =
      this.marker && String(this.marker).trim()
        ? String(this.marker).trim()
        : 'Sj';
    const name = raw
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase();
    const id = SjMarkerDirective._nextId++;
    try {
      this.renderer.setAttribute(
        this.el.nativeElement,
        'data-sj-component',
        name
      );
      this.renderer.setAttribute(
        this.el.nativeElement,
        'data-sj-id',
        String(id)
      );
    } catch {}
  }
}
