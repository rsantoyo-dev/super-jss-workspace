import { SuperJssDirective } from "./super-jss.directive";
import {Component} from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {sjSpace, theme} from "./public-api";
import {By} from "@angular/platform-browser";
import {sjColor} from "../model";

// Test component to simulate the usage of the directive
@Component({
  template: `
    <h2 [sj]="{backgroundColor:sjColor.primary, padding:sjSpace(2)}">About</h2>
    <h3 [sj]="{backgroundColor:'green'}">Quote of the day:</h3>
  `
})
export class TestComponent {
  protected readonly theme = theme;
  protected readonly sjSpace = sjSpace;
  protected readonly sjColor = sjColor;
}
describe('SuperJssDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    // Configure the test module
    TestBed.configureTestingModule({
      declarations: [SuperJssDirective, TestComponent]
    });

    // Create the component
    fixture = TestBed.createComponent(TestComponent);
    // Trigger initial data binding
    fixture.detectChanges();
  });

  it('should update styles on elements with [sj] binding', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2.style.backgroundColor).toBe('rgb(52, 152, 219)');

    expect(h2.style.padding).toBe('2rem');

    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    expect(h3.style.backgroundColor).toBe('green');
  });

  it('should remove event listeners on destroy', () => {
    const directive = fixture.debugElement.query(By.directive(SuperJssDirective)).injector.get(SuperJssDirective);
    spyOn(window, 'removeEventListener');
    directive.ngOnDestroy();
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', jasmine.any(Function));
    expect(window.removeEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));
  });


});





