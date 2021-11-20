import {Component, OnInit} from '@angular/core';
import {ITheme, SJss, SuperJssService} from "super-jss";

@Component({
  selector: 'sJssDemo-code-snippet',
  template: `
    <div [sJss]="sjRoot">
      <code >
        <ng-content>
        </ng-content>
      </code>
    </div>
    `,
  styles: []
})
export class CodeSnippetComponent implements OnInit {

  theme: ITheme;
  sjRoot: SJss;

  constructor(private jsService: SuperJssService) {
    this.theme = jsService.theme
    this.sjRoot = {
      backgroundColor: this.theme.palette.common.gray.light,
      padding: this.theme.spacing(3)
    }

  }


  ngOnInit(): void {

  }

  styles() {

  }

}
