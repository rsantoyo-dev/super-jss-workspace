import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {sjColor, sjSpace, SJssStyles, SuperJssModule, sjTheme} from "super-jss";
import {appTheme} from "../../sjStyling/themeHandler";

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule, SuperJssModule],
  template: `
    <div [sj]="sjContainer">
     <h1 [sj]="">H1: Super JSS leaps</h1>
      <h2 [sj]="">H2: Over lazy CSS colleagues</h2>
      <h3 [sj]="">H3: No media query, thanks to TypeScript!</h3>
      <h4 [sj]="">H4: Just xs || md || lg || xl, Yarn's got our back!</h4>
      <h5 [sj]="">H5: Bold and bolder, Angular style!</h5>
      <h6 [sj]="">H6: Roboto rocks in this project!</h6>
      <strong [sj]="">STRONG: SJSS wins with its responsive design!</strong>
      <p [sj]="">P: Helvetica too, making our text look great!</p>
      <span [sj]="">SPAN: Flexing flex, for a flexible layout!</span>

    </div>
  `
})
export class TypographyComponent {
  sjContainer: SJssStyles = {
    display: 'flex',
    flexDirection: 'column',
    color: sjColor.neutralDark,
    padding: { xs: sjSpace(1), md: sjSpace(1) },
  };
  constructor() {
    sjTheme.set(appTheme())
  }
}
