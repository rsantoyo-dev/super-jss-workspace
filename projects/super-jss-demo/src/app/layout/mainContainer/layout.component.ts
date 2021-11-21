import {Component, OnInit} from '@angular/core';
import {ITheme} from "../../../../../super-jss/src/lib/super-jss-model";
import {SuperJssService} from "../../../../../super-jss/src/lib/super-jss.service";
import {HighlightResult} from "ngx-highlightjs";

@Component({
  selector: 'sJssDemo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  theme: ITheme

  snippetBasicSjss =`header: SJss = {
    padding: '3rem',
    backgroundColor: 'gray',
    color: 'white',
  }`
  snippetBasicHtml =`<div [sJss]="header">
    HELLO WORLD USING SUPER JSS
 </div>`
  constructor(sjService: SuperJssService) {
    this.theme = sjService.theme;

  }

  ngOnInit(): void {
  }


}
