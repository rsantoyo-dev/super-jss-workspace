import {Component, effect, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SjDirective} from 'super-jss';
import { SjThemeService } from 'super-jss';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SjDirective],
  template: `
    <div [sj]="
      {d: 'flex',       fxDir: 'column',
        fxAItems: 'center',
        fxJustify: 'center',
        p: { xs: 1, md: 3 },
        bg: { xs: 'primary', md: 'primary.light'}
      }">
      <h3 [sj]="{ color: 'primary.contrast' }">SUPER-JSS-DEMO</h3>
      <span
        (click)="updateTheme()"
        [sj]="{ color: 'primary.dark', cursor: 'pointer' }"
      >
        click here to update theme
      </span>
    </div>
    <div [sj]="
      {
        bg: 'secondary.light',
        padding: 0.5,
        display: 'flex',
        justifyContent: 'center'
      }
    ">
      <span [sj]="{ color: 'secondary.dark', fontSize: 1 }">
         sjBreakpoints: {{ JSON.stringify(breakpoints)}}
      </span>
    </div>
  `,
})
export class HeaderComponent {

  defaultThemeConfig = this.th.sjTheme();

  toggleTheme = signal(false);

  breakpoints =  this.th.breakpoints();

  constructor(private th:SjThemeService) {
    effect(() => {
      this.breakpoints = this.th.breakpoints();
    })
  }

  updateTheme() {
    if(!this.toggleTheme()) {
      this.th.setPalette({
        primary: {
          main: this.th.colors().purple[500],
          light: this.th.colors().purple[200],
          dark: this.th.colors().purple[700],
          contrast: this.th.colors().orange[300],
        },
        secondary: {
          main: this.th.colors().yellow[500],
          light: this.th.colors().yellow[200],
          dark: this.th.colors().yellow[700],
          contrast: this.th.colors().purple[700],
        }
      });
      this.th.setBreakpoints({
        sm: 630,
        md: 900,
      });
      this.th.setTypography({
        default: { fontFamily: 'Courier New'},
      });
    }
    else{
      this.th.setPalette(this.defaultThemeConfig.palette);
      this.th.setBreakpoints(this.defaultThemeConfig.breakpoints);
      this.th.setTypography(this.defaultThemeConfig.typography);
    }

    this.toggleTheme.set(!this.toggleTheme());

  }

  protected readonly JSON = JSON;
}
