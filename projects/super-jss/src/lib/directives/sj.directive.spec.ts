import { SjDirective } from "./sj.directive";
import {Component} from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

// Test component to simulate the usage of the directive
@Component({
  standalone: true,
  imports: [SjDirective],
  template: `
    <h2 [sj]="{bg:'#003366', p:{xs:1, md:2, lg:4}, m:2}">About</h2>
    <h3 [sj]="{bg:'primary'}">Quote of the day:</h3>
    <h4 [sj]="[{px: 4, py:2, mx:2, my:2, bx:'solid', by:'solid'}, {c:'secondary.500'}]">Quote of the day:</h4>
  `
})
export class TestComponent {

}
describe('SuperJssDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SjDirective, TestComponent], // Import both the directive and the test component
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should update styles on elements with [sj] binding', () => {    fixture.detectChanges(); // Ensure changes are applied

    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const computedStyle = window.getComputedStyle(h2);
    expect(computedStyle.backgroundColor).toBe('rgb(0, 51, 102)');
    expect(computedStyle.padding).toBe('16px');

  });

  it('should update px to padding right/left [sj] binding, and arrays', () => {    fixture.detectChanges(); // Ensure changes are applied
    const h4: HTMLElement = fixture.nativeElement.querySelector('h4');
    const computedStyle = window.getComputedStyle(h4);
    expect(computedStyle.paddingLeft).toBe('32px');
    expect(computedStyle.paddingRight).toBe('32px');
    expect(computedStyle.paddingTop).toBe('16px');
    expect(computedStyle.paddingBottom).toBe('16px');
    expect(computedStyle.marginLeft).toBe('16px');
    expect(computedStyle.marginRight).toBe('16px');
    expect(computedStyle.borderLeft).toBe('1.5px solid rgb(0, 0, 0)');
    expect(computedStyle.borderRight).toBe('1.5px solid rgb(0, 0, 0)');
    expect(computedStyle.borderTop).toBe('1.5px solid rgb(0, 0, 0)');
    expect(computedStyle.borderBottom).toBe('1.5px solid rgb(0, 0, 0)');

  });


  it('should update palette in  [sj] binding', () => {    fixture.detectChanges(); // Ensure changes are applied
    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    const computedStyle = window.getComputedStyle(h3);
    expect(computedStyle.backgroundColor).toBe('rgb(52, 152, 219)');
  });




});





