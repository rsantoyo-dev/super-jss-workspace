import {Component} from "@angular/core";
import {SJss, SJssTheme, SJssThemeService, SuperJssModule } from "projects/super-jss/src/lib";


@Component({ selector: 'app-root',
  standalone: true,
  imports: [SuperJssModule],
  template: `
    <div [sj]="sjMainBootstrap(theme)">
      <div [sj]="{display:'flex',
        alignItems:'center',
        justifyContent:'center',
        padding: theme.spacing(2),
        width:'100%',
        height:{xs:theme.spacing(5), md:theme.spacing(8)},
        backgroundColor: theme.palette.secondary.main}"
      >
        <h3 [sj]>Super-JSS Demo</h3>
      </div>
      <div [sj]="{display:'flex', justifyContent:'center', height:theme.spacing(30), backgroundColor:theme.palette.common.gray.light}">
          test
      </div>
    </div>
  `})

export class AppComponent {

  theme: SJssTheme = this.themeService.defaultTheme();
  sjMainBootstrap = (t:SJssTheme) => <SJss> {
    display:'flex',
    flexDirection:'column',
    width:'100%',
    height:'100vh',
    backgroundColor: t.palette.primary.main,
  }
  constructor(private themeService: SJssThemeService) {
    this.themeService.themeChanges$.subscribe(theme => {
      this.theme = theme;
    })
  }

}

