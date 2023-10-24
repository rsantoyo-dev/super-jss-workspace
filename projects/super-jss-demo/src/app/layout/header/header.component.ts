import { Component, OnInit } from '@angular/core';
import {SJssTheme, SJssThemeService} from "super-jss";



@Component({
  selector: 'sJssDemo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  theme:SJssTheme

 /* SjCenter:SJssStyles = {
    display:'flex',
  }*/
  constructor(private themeService: SJssThemeService) {
    this.theme= themeService.defaultTheme();
   themeService.themeChanges().subscribe(t=>{this.theme = t})
  }

  ngOnInit(): void {
  }

  colorClicked(){
    let th:SJssTheme | null = {...this.theme};


    if( th.palette.primary.main === '#147a81'){

      th.palette.primary = th.palette.secondary;
      th.palette.secondary = th.palette.primary;
      th.breakpoints.md='750';
      th.spacing = (factor) => `${0.5 * factor}rem`;
      this.themeService.setTheme(th);

      return;
    }

    else{
      this.themeService.setTheme(this.themeService.defaultTheme());
    }


  }

}
