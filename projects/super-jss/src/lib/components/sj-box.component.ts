import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { sjBox } from '../blueprints/box';
import { SjHostComponent } from './sj-host.component';
import { SjStyle } from '../models/interfaces';

@Component({
  selector: "sj-box",
  standalone: true,
  template: `<sj-host [sj]="boxProducer"><ng-content></ng-content></sj-host>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SjHostComponent],
})
export class SjBoxComponent implements OnChanges {
  // Display mode: flex row, flex column, or grid
  @Input() display: SjStyle['d'];

  // Flexbox controls
  @Input() align?: SjStyle['fxAItems'];       // align-items
  @Input() justify?: SjStyle['fxJustify'];     // justify-content
  @Input() wrap?: SjStyle['fxWrap'];           // flex-wrap
  @Input() gap?: SjStyle['gap'];               // gap between children

  // Colors
  @Input() bg?: SjStyle['bg'];                 // background color
  @Input() color?: SjStyle['c'];               // text color

  // The function passed to SjDirective (producer pattern)
  boxProducer: () => SjStyle = sjBox;

  ngOnChanges(_: SimpleChanges): void {
    this.boxProducer = this.buildProducer();
  }

  private buildProducer(): () => SjStyle {
    const parts: Array<Partial<SjStyle>> = [];

    // Display selection
    if (this.display === 'row') parts.push(sjBox.row());
    else if (this.display === 'column') parts.push(sjBox.column());
    else if (this.display === 'grid') parts.push(sjBox.grid());

    // Flex controls
    if (this.align !== undefined) parts.push({ fxAItems: this.align } as Partial<SjStyle>);
    if (this.justify !== undefined) parts.push({ fxJustify: this.justify } as Partial<SjStyle>);
    if (this.wrap !== undefined) parts.push({ fxWrap: this.wrap } as Partial<SjStyle>);
    if (this.gap !== undefined) parts.push({ gap: this.gap } as Partial<SjStyle>);

    // Colors
    if (this.bg !== undefined) parts.push({ bg: this.bg } as Partial<SjStyle>);
    if (this.color !== undefined) parts.push({ c: this.color } as Partial<SjStyle>);

    // Compose selected variants on top of base box; returns a BoxBuilder (producer)
    return sjBox.with(...parts);
  }
}
