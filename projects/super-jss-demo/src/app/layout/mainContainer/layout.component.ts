import {Component, OnInit} from '@angular/core';
import {SJssTheme, SJssStyles, SJssThemeService} from "super-jss";

@Component({
  selector: 'sJssDemo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  theme: SJssTheme;
  screenSize: string | undefined= ''

  centered: SJssStyles = {display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray'};

  constructor(themeService: SJssThemeService) {
    //window.location.href = 'https://medium.com/@viejorichard/super-jss-a-library-for-responsive-css-styles-85691b210450';
    this.theme = themeService.defaultTheme();
    themeService.themeChanges().subscribe((t) => {
      this.theme = t
    })
    themeService.breakpointChanges().subscribe(bp=>{
      this.screenSize = bp;
    })

  }



  ngOnInit(): void {
  }


}
