import { Component, OnInit } from '@angular/core';
import {ITheme, SuperJssService} from "super-jss";

@Component({
  selector: 'sJssDemo-code-snippet',
  templateUrl: './code-snippet.component.html'
})
export class CodeSnippetComponent implements OnInit {

  theme:ITheme
  constructor(sj:SuperJssService) {
    this.theme = sj.theme;
  }

  ngOnInit(): void {
  }

}
