import { SuperJssDirective } from "./super-jss.directive";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

// Test component to simulate the usage of the directive
@Component({
  template: `
    <h2 [sj]="{backgroundColor:'blue'}">About</h2>
    <h3 [sj]="{backgroundColor:'green'}">Quote of the day:</h3>
  `
})
export class TestComponent { }

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
    expect(h2.style.backgroundColor).toBe('blue');

    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    expect(h3.style.backgroundColor).toBe('green');
  });
});
