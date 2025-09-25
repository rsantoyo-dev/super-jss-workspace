import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { sjBox } from '../blueprints/box';
import { SjHostComponent } from './sj-host.component';
import { SjStyle } from '../models/interfaces';

@Component({
  selector: "sj-box",
  standalone: true,
  template: `<sj-host [sj]="sjBox()"><ng-content></ng-content></sj-host>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SjHostComponent],
})
export class SjBoxComponent  {
  sjBox = sjBox

}
