import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { sjBox } from '../blueprints/box';
import { SjHostComponent } from './sj-host.component';
import { SjStyle } from '../models/interfaces';
import type { SjInput } from '../directives/sj.directive';

@Component({
  selector: "sj-box",
  standalone: true,
  template: `<sj-host [sj]="hostSj"><ng-content></ng-content></sj-host>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SjHostComponent],
})
export class SjBoxComponent  {
  sjBox = sjBox
  @Input() sj: SjInput | undefined;

  get hostSj(): SjInput {
    const base = () => this.sjBox();
    const user = this.sj;
    if (user === undefined) return base;
    return Array.isArray(user) ? [base, ...user] : [base, user];
  }

}
