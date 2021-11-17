import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SuperJssModule} from "../../../super-jss/src/lib/super-jss.module";



@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        SuperJssModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
