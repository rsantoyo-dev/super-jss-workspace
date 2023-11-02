import { Component } from "@angular/core";

import { HeaderComponent } from "./header/header.component";
import { PaletteComponent } from "./components/palette/palette.component";
import {TypographyComponent} from "./components/typography/typography.component";
import { SuperJssModule, SJss, sjSpace, sjGetBreakpointValue, sjBreakPoint, Breakpoints, sjColor } from "super-jss";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div [sj]="sjAppBootstrap">
      <app-header></app-header>
      <div [sj]="sjMainBootstrap">
        <div [sj]="sjMainContent">
          <app-typography [sj]="sjAppPalette"></app-typography>
          <app-palette [sj]="sjAppPalette"></app-palette>
        </div>

      </div>
    </div>
  `,
  imports: [SuperJssModule, HeaderComponent, PaletteComponent, TypographyComponent]
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

  protected readonly breakPoint = sjBreakPoint;
  protected readonly sjColor = sjColor;
}

