import { Component, OnInit } from '@angular/core';
import {SJssTheme} from "../../../../../super-jss/src/lib/super-jss-model";
import {ThemeHandlerService} from "../../theme/theme-handler.service";


@Component({
  selector: 'sJssDemo-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {

  theme:SJssTheme
  constructor(private themeService: ThemeHandlerService) {
    this.theme= themeService._theme;
    themeService.getTheme().subscribe(t=>{this.theme = t})
  }

  ngOnInit(): void {
  }

}
