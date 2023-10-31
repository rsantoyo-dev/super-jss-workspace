import {Component} from "@angular/core";
import {SJss, SuperJssModule, sjColor, sjSpace, breakPoint} from "projects/super-jss/src/lib";
import {HeaderComponent} from "./header/header.component";
@Component({ selector: 'app-root',
  standalone: true,
  imports: [SuperJssModule, HeaderComponent],
  template: `
    <div [sj]="sjMainBootstrap">
      <app-header></app-header>
      <div [sj]="sjMainScreen">
        <h3 [sj]="">Super-JSS Demo</h3>
        <h6 [sj]="{color:sjColor.primary}">Breakpoint: {{breakPoint()}}</h6>
      </div>
    </div>
  `})

export class AppComponent {
  sjMainBootstrap:SJss = {
    display:'flex',
    flexDirection: 'column',
    width:'100%',
    height:'100vh',
    backgroundColor: {xs: sjColor.dark, md: sjColor.neutral},
  }

  sjMainScreen:SJss = {
    display:'flex', flexDirection: 'column', height:'100%', justifyContent:'center', alignItems:'center', backgroundColor: sjColor.neutral, padding: sjSpace(2)}
  protected readonly breakPoint = breakPoint;
  protected readonly sjColor = sjColor;
}

