import {Component} from "@angular/core";
import {SJss,  SuperJssModule, SjQuick } from "projects/super-jss/src/lib";
import {HeaderComponent} from "./header/header.component";
@Component({ selector: 'app-root',
  standalone: true,
  imports: [SuperJssModule, HeaderComponent],
  template: `
    <div [sj]="sjMainBootstrap">
      <app-header></app-header>
      <div [sj]="sjMainScreen">
        <h3 [sj]="">Super-JSS Demo</h3>
      </div>
    </div>
  `})

export class AppComponent {
  sjMainBootstrap:SJss = {
    display:'flex',
    flexDirection:'column',
    width:'100%',
    height:'100vh',
    backgroundColor: {xs: SjQuick.grayDark, md: SjQuick.grayLight},
  }

  sjMainScreen:SJss = {
    display:'flex', height:'100%', justifyContent:'center', alignItems:'center'}
}

