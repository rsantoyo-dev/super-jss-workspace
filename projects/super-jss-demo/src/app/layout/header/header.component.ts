import { Component, OnInit } from '@angular/core';
import {SJssTheme} from "../../../../../super-jss/src/lib/super-jss-model";
import {ThemeHandlerService} from "../../theme/theme-handler.service";


@Component({
  selector: 'sJssDemo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  theme:SJssTheme ;
  constructor(private themeService: ThemeHandlerService) {
    this.theme= themeService._theme;
   themeService.getTheme().subscribe(t=>{this.theme = t})
  }

  ngOnInit(): void {
  }

  colorClicked(){
    let th:SJssTheme | null = {...this.theme}

    if(th.palette.primary.main === '#ff3366'){
      th.palette.primary.main = '#003366';
      this.themeService.setTheme(th);
      return;
    }
    th.palette.primary.main = '#ff3366';

  }

}
