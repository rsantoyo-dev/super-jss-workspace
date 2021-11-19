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
  constructor(private sjService:SuperJssService) {
    this.theme = sjService.theme
  }

  ngOnInit(): void {
  }

  colorClicked(){
    let th:ITheme = {...this.sjService.theme}
    if(this.theme.palette.primary.main ==='#ff3366'){
      th.palette.primary.main = this.sjService.defaultTheme().palette.primary.main
    }
    else{
      th.palette.primary.main='#ff3366'
    }
    this.theme = {...th}
  }

}
