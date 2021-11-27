import { Component, OnInit } from '@angular/core';
import {SJssTheme} from "../../../../../super-jss/src/lib/super-jss-model";
import {SuperJssService} from "super-jss";


@Component({
  selector: 'sJssDemo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  theme:SJssTheme
  constructor(private sjService:SuperJssService) {
    this.theme = sjService.theme
  }

  ngOnInit(): void {
  }

  colorClicked(){
    let th:SJssTheme = {...this.sjService.theme}
    if(this.theme.palette.primary.main ==='#ff3366'){
      th.palette.primary.main = this.sjService.defaultTheme().palette.primary.main
    }
    else{
      th.palette.primary.main='#ff3366'
    }
    this.theme = {...th}
  }

}
