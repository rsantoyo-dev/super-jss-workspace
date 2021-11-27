import { Component, OnInit } from '@angular/core';
import {SJssTheme, SuperJssService} from "super-jss";

@Component({
  selector: 'sJssDemo-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {

  theme:SJssTheme
  constructor(private superJssService:SuperJssService) {
    this.theme = superJssService.theme;
  }

  ngOnInit(): void {
  }

}
