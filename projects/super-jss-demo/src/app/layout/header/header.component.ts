import { Component, OnInit } from '@angular/core';
import {ITheme} from "../../../../../super-jss/src/lib/super-jss-model";
import {SuperJssService} from "../../../../../super-jss/src/lib/super-jss.service";

@Component({
  selector: 'sJssDemo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  theme:ITheme
  constructor(sjService:SuperJssService) {
    this.theme = sjService.theme();
  }

  ngOnInit(): void {
  }

  colorClicked(){
    this.theme.palette.primary.main = '#003366'
    console.log('sss')
  }

}
