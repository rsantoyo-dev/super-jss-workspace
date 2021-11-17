import { Component } from '@angular/core';
import {ITheme} from "../../../super-jss/src/lib/super-jss-model";
import {SuperJssService} from "../../../super-jss/src/lib/super-jss.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'super-jss-demo';
  theme:ITheme
  constructor(sjService:SuperJssService) {
    this.theme = sjService.theme();
    this.theme.palette.primary.main="#3056ca"
  }
}
