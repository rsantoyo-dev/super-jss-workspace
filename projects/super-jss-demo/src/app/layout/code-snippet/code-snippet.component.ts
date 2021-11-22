import { Component, OnInit } from '@angular/core';
import {ITheme, SuperJssService} from "super-jss";

@Component({
  selector: 'sJssDemo-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {

  theme:ITheme
  constructor(private sj:SuperJssService) {
    this.theme = sj.theme;
  }

  ngOnInit(): void {
  }

}
