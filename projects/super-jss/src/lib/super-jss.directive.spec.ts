import {SJssThemeService} from "./s-jss-theme.service";
import {SJssTheme} from "./super-jss-model";
import {SuperJssDirective} from "./super-jss.directive";
import {Component, SimpleChange, SimpleChanges, ViewContainerRef} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

@Component({
  template: `
    <h2 [sj]="{backgroundColor:'blue'}">About</h2>
    <h3 [sJss]="{backgroundColor:'green'}">Quote of the day:</h3>
    <twain-quote></twain-quote>
  `
})
export class TestComponent { }

describe('super-jss Directive', () => {
  let directive: SuperJssDirective;
  let fixture: ComponentFixture<TestComponent>;
  let des

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ SuperJssDirective, TestComponent ]
    })
      .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    des = fixture.debugElement.queryAll(By.directive(SuperJssDirective));
    console.log(des)
    // color tests


  });
  it('should have three highlighted elements', () => {
    expect(des.length).toBe(2);
  });
  it('#should update styles on update [sj]', ()=>{
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2.style.backgroundColor).toBe('blue')
    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    expect(h3.style.backgroundColor).toBe('green')
  });

});
