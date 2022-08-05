
import {SuperJssDirective} from "./super-jss.directive";
import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

@Component({
  template: `
    <h2 [sj]="{backgroundColor:'blue'}">About</h2>
    <h3 [sj]="{backgroundColor:'green'}">Quote of the day:</h3>
    <twain-quote></twain-quote>
  `
})
export class TestComponent { }

describe('super-jss Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ SuperJssDirective, TestComponent ]
    })
      .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    des = fixture.debugElement.queryAll(By.directive(SuperJssDirective));

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
