import {Component, effect, signal} from "@angular/core";
import {SJss, SJssTheme, SJssThemeService, SuperJssModule } from "projects/super-jss/src/lib";
import {HeaderComponent} from "./header/header.component";
@Component({ selector: 'app-root',
  standalone: true,
  imports: [SuperJssModule, HeaderComponent],
  template: `
    <div [sj]="sjMainBootstrap()">
      <app-header></app-header>
        <h3 [sj]="">Super-JSS Demo</h3>
      </div>
      <div [sj]="{display:'flex', justifyContent:'center', height:'30rem', backgroundColor:'sj-gray-light'}">
          test
      </div>
  `})

export class AppComponent {
  sjMainBootstrap = () => <SJss> {
    display:'flex',
    flexDirection:'column',
    width:'100%',
    height:'100vh',
    backgroundColor: {xs: 'sj-gray-light', md: 'sj-gray-dark'},
  }
}

