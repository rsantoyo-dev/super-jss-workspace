import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SjDirective} from 'super-jss';
import {sjBorderShadow} from "../../sjStyling/sjStyles";

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule, SjDirective],
  template: `
    <h3 [sj]="{c: 'primary', pb: 1 }">Typography:</h3>
    <div [sj]="[{d:'flex', fxDir:'column', bg:'light.light', p: 2 }, sjBorderShadow]">
      <h1 [sj]="{c: 'secondary'}">H1: <a href="https://www.npmjs.com/package/super-jss">Super JSS</a> leaps</h1>
      <h2 [sj]="{c:'tertiary'}">H2: Over lazy CSS colleagues</h2>
      <h3 [sj]>H3: No media query, thanks to TypeScript!</h3>
      <h4 [sj]>H4: Just xs || md || lg || xl, Yarn's got our back!</h4>
      <h5 [sj]>H5: Bold and bolder, Angular style!</h5>
      <h6 [sj]>H6: Fonts rocks in this project!</h6>
      <p [sj]>P: Theming too, making our text look great!</p>
      <span [sj]>SPAN: Flexing flex, for a flexible layout!</span>
      <strong [sj]>STRONG: SJSS wins with its responsive design!</strong>
      <body [sj]>BODY: SJSS is the best!</body>
      <caption [sj]>CAPTION: SJSS is the best!</caption>
    </div>
  `
})

export class TypographyComponent {
  protected readonly sjBorderShadow = sjBorderShadow;
}
