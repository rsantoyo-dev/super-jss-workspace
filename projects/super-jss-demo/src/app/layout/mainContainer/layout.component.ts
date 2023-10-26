import {Component, OnInit} from '@angular/core';
import {SJssStyles, SJssTheme, SJssThemeService} from "../../../../../super-jss/src/lib";

@Component({
  selector: 'sJssDemo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  theme: SJssTheme;
  screenSize: string | undefined= ''

  myTestStyle: SJssStyles = {backgroundColor: 'lightgray', height: '300px'};
  myTestFlex: SJssStyles = {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'};

  constructor(themeService: SJssThemeService) {
    //window.location.href = 'https://www.sjss.dev';
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
