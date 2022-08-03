import { Component, OnInit } from '@angular/core';
import {SJssTheme} from "../../../../../super-jss/src/lib/super-jss-model";
import {SJssThemeService} from "../../../../../super-jss/src/lib/core/s-jss-theme.service";


@Component({
  selector: 'sJssDemo-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {

  theme:SJssTheme
  constructor(private themeService: SJssThemeService) {
    this.theme = this.themeService.defaultTheme();
    themeService.themeChanges$.subscribe(t=>{this.theme = t})
  }

  ngOnInit(): void {
  }

}
