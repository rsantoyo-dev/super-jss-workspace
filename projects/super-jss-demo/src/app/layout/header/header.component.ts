import { Component, OnInit } from '@angular/core';
import {SJssStyles, SJssTheme, SJssThemeService} from 'projects/super-jss/src/lib/';


@Component({
  selector: 'sJssDemo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  theme:SJssTheme;

  sjMyClassPadding:SJssStyles ={};

  constructor(private themeService: SJssThemeService) {
    this.theme= themeService.defaultTheme();

   themeService.themeChanges().subscribe(t=>{
     this.setClasses()
     this.theme = t
   })
  }

  setClasses(){
    this.sjMyClassPadding = {padding:{xs:this.theme.spacing(1), md:this.theme.spacing(2)}}
  }

  ngOnInit(): void {
  }

  colorClicked(){
    let th:SJssTheme | null = {...this.theme};


    if( th.palette.primary.main === '#147a81'){
      th.palette.primary = th.palette.secondary;
      th.palette.secondary = th.palette.primary;
      th.breakpoints.md=750;
      th.spacing = (factor) => `${0.5 * factor}rem`;
      this.themeService.setTheme(th);
      /*console.log(this.themeService.theme.breakpoints)*/
      return;
    }

    else{
      this.themeService.setTheme(this.themeService.defaultTheme());
    }
  }

}
