import {Component, effect, signal} from "@angular/core";
import {SJss, SJssTheme, SJssThemeService, SuperJssModule, SjQuick } from "projects/super-jss/src/lib";
import {HeaderComponent} from "./header/header.component";
@Component({ selector: 'app-root',
  standalone: true,
  imports: [SuperJssModule, HeaderComponent],
  template: `
    <div [sj]="sjMainBootstrap()">
      <app-header></app-header>
      <div [sj]="{display:'flex', height:'100%', justifyContent:'center', alignItems:'center'}">
        <h3 [sj]>Super-JSS Demo</h3>
      </div>
  `})

export class AppComponent {
  sjMainBootstrap = () => <SJss> {
    display:'flex',
    flexDirection:'column',
    width:'100%',
    height:'100vh',
    backgroundColor: {xs: SjQuick.grayDark, md: SjQuick.grayLight},
  }
}

