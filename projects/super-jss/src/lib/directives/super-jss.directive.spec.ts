import { SuperJssDirective } from "./super-jss.directive";
import {Component, ElementRef, ViewChild} from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {theme} from "./public-api";
import {By} from "@angular/platform-browser";

// Test component to simulate the usage of the directive
@Component({
  template: `
    <h2 [sj]="{backgroundColor:'sj-primary', padding:theme().spacing(2)}">About</h2>
    <h3 [sj]="{backgroundColor:'green'}">Quote of the day:</h3>
  `
})
export class TestComponent {
  protected readonly theme = theme;
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
    expect(h2.style.backgroundColor).toBe('rgb(20, 122, 129)');

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





