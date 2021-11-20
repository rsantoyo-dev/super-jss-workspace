import { Component, OnInit } from '@angular/core';
import {ITheme, SJss, SuperJssService} from "super-jss";

@Component({
  selector: 'sJssDemo-code-snippet',
  templateUrl: './code-snippet.component.html',

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

}
