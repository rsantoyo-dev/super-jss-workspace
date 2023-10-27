import {Component, signal} from "@angular/core";
import {SJss, SJssTheme, SJssThemeService, SuperJssModule } from "projects/super-jss/src/lib";
import {HeaderComponent} from "./header/header.component";
@Component({ selector: 'app-root',
  standalone: true,
  imports: [SuperJssModule, HeaderComponent],
  template: `
    <div [sj]="sjMainBootstrap(theme())">
      <app-header></app-header>
        <h3 [sj]="">Super-JSS Demo</h3>
      </div>
      <div [sj]="{display:'flex', justifyContent:'center', height:theme().spacing(30), backgroundColor:theme().palette.common.gray.light}">
          test
      </div>
  `})

export class AppComponent {

  theme = signal(this.themeService.defaultTheme());
  sjMainBootstrap = (t:SJssTheme) => <SJss> {
    display:'flex',
    flexDirection:'column',
    width:'100%',
    height:'100vh',
    backgroundColor: t.palette.common.gray.light
  }
  constructor(private themeService: SJssThemeService) {
    this.themeService.themeChanges$.subscribe(theme => {
      this.theme.set(theme);
    })
  }

}

