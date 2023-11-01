import { Component } from "@angular/core";
import { SJss, SuperJssModule, sjColor, sjSpace, breakPoint, sjGetBreakpointValue, Breakpoints } from "projects/super-jss/src/lib";
import { HeaderComponent } from "./header/header.component";
import { PaletteComponent } from "./components/palette/palette.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div [sj]="sjAppBootstrap">
      <app-header></app-header>
      <div [sj]="sjMainBootstrap">
        <div [sj]="sjMainContent">
          <app-palette [sj]="sjAppPalette"></app-palette>
        </div>
        
      </div>
    </div>
  `,
  imports: [SuperJssModule, HeaderComponent, PaletteComponent]
})
export class AppComponent {
  sjAppBootstrap: SJss = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',

  };

  sjMainBootstrap: SJss = {
    display: 'flex',
    justifyContent: 'center',
  };
  
  sjMainContent: SJss = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: { xs: sjSpace(1), md: sjSpace(2) },
    width: { xs: '100%' },
    maxWidth: sjGetBreakpointValue(Breakpoints.LG),

  };

  sjAppPalette: SJss = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  };

  protected readonly breakPoint = breakPoint;
  protected readonly sjColor = sjColor;
}

