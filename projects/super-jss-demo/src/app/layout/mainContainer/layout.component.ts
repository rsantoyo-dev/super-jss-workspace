import { Component, OnInit } from '@angular/core';
import {ITheme} from "../../../../../super-jss/src/lib/super-jss-model";
import {SuperJssService} from "../../../../../super-jss/src/lib/super-jss.service";

@Component({
  selector: 'sJssDemo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  theme:ITheme
  constructor(sjService:SuperJssService) {
    this.theme = sjService.theme();
  }

  ngOnInit(): void {
  }

}
