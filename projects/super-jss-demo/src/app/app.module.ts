import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/mainContainer/layout.component';
import { CodeSnippetComponent } from './layout/code-snippet/code-snippet.component';
import {SuperJssModule} from "../../../super-jss/src/lib/super-jss.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    CodeSnippetComponent
  ],
    imports: [
        BrowserModule,
        SuperJssModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
