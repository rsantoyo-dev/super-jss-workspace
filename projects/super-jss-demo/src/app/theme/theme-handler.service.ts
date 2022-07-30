import { Injectable } from '@angular/core';
import {SJssTheme} from "../../../../super-jss/src/lib/super-jss-model";
import {BehaviorSubject, Observable} from "rxjs";
import {SuperJssService} from "../../../../super-jss/src/lib/super-jss.service";

@Injectable({
  providedIn: 'root'
})
export class ThemeHandlerService {

  _theme: SJssTheme
  themeChanges: BehaviorSubject<SJssTheme>;

  constructor(private superJssService: SuperJssService) {
    this._theme =superJssService.defaultTheme();
    this.themeChanges = new BehaviorSubject<SJssTheme>(this._theme);
  }
  setTheme(newValue:SJssTheme): void {
    this._theme = newValue;
    this.superJssService.setTheme(this._theme);
    this.themeChanges.next(this._theme);
  }
  getTheme(): Observable<SJssTheme> {
    return this.themeChanges.asObservable();
  }
  getDefaultTheme():SJssTheme{
    return this.superJssService.defaultTheme();
  }
}
