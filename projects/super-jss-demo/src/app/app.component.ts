import { Component } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { TypographyComponent } from "./components/typography/typography.component";
import { PaletteComponent } from "./components/palette/palette.component";
import {SjDirective} from "super-jss";
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [SjDirective, HeaderComponent, TypographyComponent, PaletteComponent],
    template: `
    <div [sj]="{d:'flex', fxDir: 'column', bg:'light'}">
      <app-header [sj]="{width:'100%'}"></app-header>
      <div [sj]="{d:'flex', fxDir: 'column', p: {xs: 2, md: 4}, gap: 2, fxAItems:'center'}">
        <app-typography [sj]="{d:'flex', fxDir:'column', width:'100%', maxWidth: 100}"></app-typography>
        <app-palette [sj]="{d:'flex', fxDir:'column', width:'100%', maxWidth: 100}"></app-palette>
      </div>
    </div>
  `
})


export class AppComponent {}

