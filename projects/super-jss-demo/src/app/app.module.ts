import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/mainContainer/layout.component';
import { SuperJssModule } from "../../../super-jss/src/lib";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    SuperJssModule,
    SuperJssModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
