import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperJssModule, sjSpace, sjColor, sjTheme, sjGetStyle } from 'super-jss';
import { sjBorderShadow, sjBorder } from '../../sjStyling/sjStyles';
import {appTheme} from "../../sjStyling/themeHandler";

@Component({
  selector: 'app-palette',
  standalone: true,
  imports: [CommonModule, SuperJssModule],
  template: `
    <div *ngFor="let color of demoColors()"
      [sj]="[{
        display: 'flex',
        flexDirection: 'column',
        margin: sjSpace(1),
        padding: sjSpace(1),
       }, sjBorderShadow]"
    >
      <p [sj]="[{padding:sjSpace(0.5)+' '+sjSpace(1), color:color[0], fontWeight:'bold'}]">{{ color[0] }}</p>
      <div [sj]="{display:'flex', flexDirection:{xs:'column', md:'row'}}">
        <div *ngFor="let colorVariant of color" [sj]="[
          {
            display: 'flex',
            flexGrow: '1',
            flexDirection: 'column',
            alignItems: 'center',
            padding: sjSpace(1),
            margin: sjSpace(0.2)+' '+sjSpace(0.5),
            backgroundColor: colorVariant,

          }, sjBorder]"
        >
          <span [sj]="">{{ colorVariant }}</span>
          <h6 [sj]="">{{ sjGetStyle(colorVariant) }}</h6>
        </div>
      </div>

    </div>
  `
})
export class PaletteComponent {
    demoColors = signal([
      [sjColor.primary, sjColor.primaryLight, sjColor.primaryDark, sjColor.primaryContrast],
      [sjColor.secondary, sjColor.secondaryLight, sjColor.secondaryDark, sjColor.secondaryContrast],
      [sjColor.tertiary, sjColor.tertiaryLight, sjColor.tertiaryDark, sjColor.tertiaryContrast],
      [sjColor.error, sjColor.errorLight, sjColor.errorDark],
      [sjColor.warning, sjColor.warningLight, sjColor.warningDark],
      [sjColor.info, sjColor.infoLight, sjColor.infoDark],
      [sjColor.success, sjColor.successLight, sjColor.successDark],
      [sjColor.textPrimary, sjColor.textSecondary, sjColor.textDisabled],
      [sjColor.dark, sjColor.darkDark, sjColor.darkLight],
      [sjColor.light, sjColor.lightLight, sjColor.lightDark]
    ]);

      // assign to local variables for template
    sjSpace = sjSpace;
    sjBorder = sjBorder;
    sjGetStyle = sjGetStyle;
    sjBorderShadow = sjBorderShadow;
    constructor() {
      sjTheme.set(appTheme())
    }
}
