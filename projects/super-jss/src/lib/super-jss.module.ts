import { NgModule } from '@angular/core';
import { SuperJssComponent } from './super-jss.component';
import { SuperJssDirective } from './super-jss.directive';

@NgModule({
  declarations: [
    SuperJssComponent,
    SuperJssDirective
  ],
  imports: [
  ],
  exports: [
    SuperJssComponent,
    SuperJssDirective,

  ]
})
export class SuperJssModule { }
