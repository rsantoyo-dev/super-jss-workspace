import {Component, OnInit} from '@angular/core';
import {SJssTheme} from "../../../../../super-jss/src/lib/super-jss-model";
import {SJssThemeService} from "../../../../../super-jss/src/lib/s-jss-theme.service";




@Component({
  selector: 'sJssDemo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  theme: SJssTheme;
  screenSize: string | undefined= ''

  snippetBasicSjss = `header: SJss = {
    padding: '3rem',
    backgroundColor: 'gray',
    color: 'white'
  }`;

  snippetBasicHtml =`<div [sj]="header">
    HELLO WORLD USING SUPER JSS
 </div>`;

  snippetInlineHtml =`<div [sj]="{padding: '3rem', backgroundColor: 'gray', color: 'white'}">
    HELLO WORLD USING SUPER JSS
 </div>`;

  constructor(themeService: SJssThemeService) {
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
