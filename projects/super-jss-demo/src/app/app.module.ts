import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SuperJssModule} from "../../../super-jss/src/lib/super-jss.module";
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/mainContainer/layout.component';
import { CodeSnippetComponent } from './shared/code-snippet/code-snippet.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    CodeSnippetComponent,

  ],
    imports: [
        BrowserModule,
        SuperJssModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
