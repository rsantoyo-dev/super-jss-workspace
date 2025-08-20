import { SjDirective } from "./sj.directive";
import {Component} from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

// Test component to simulate the usage of the directive
@Component({
    imports: [SjDirective],
    template: `
    <h2 [sj]="{bg:'#003366', p:{xs:1, md:2, lg:4}, m:2}">About</h2>
    <h3 [sj]="{bg:'primary', c:'blue'}">Quote of the day:</h3>
    <h4 [sj]="[{bg:'primary.main',  px: 4, py:2, mx:2, my:2, bx:'solid', by:'solid'}, {c:'secondary.500'}]">Quote of the day:</h4>
    <h5 [sj]="{length:'n', bg:'blue.300', mdt:'test err', padding:{md: 2}}">About</h5>
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

  it('should get color.shade, or just color', () => {fixture.detectChanges(); // Ensure changes are applied

    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    const computedStyle = window.getComputedStyle(h3);
    expect(computedStyle.color).toBe('rgb(52, 152, 219)');

  });

  it('should get palette.color.shade, or just color', () => {fixture.detectChanges(); // Ensure changes are applied

    const h4: HTMLElement = fixture.nativeElement.querySelector('h4');
    const computedStyle = window.getComputedStyle(h4);
    expect(computedStyle.backgroundColor).toBe('rgb(52, 152, 219)');

    const h5: HTMLElement = fixture.nativeElement.querySelector('h5');
    const computedStyleH5 = window.getComputedStyle(h5);
    expect(computedStyleH5.padding).toBe('16px');



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


  it('should translate px to padding right/left in [sj] binding', () => {
    fixture.detectChanges();
    const h4: HTMLElement = fixture.nativeElement.querySelector('h4');
    const computedStyle = window.getComputedStyle(h4);
    expect(computedStyle.paddingLeft).toBe('32px');
    expect(computedStyle.paddingRight).toBe('32px');
  });

  // Test for px shorthand property (already existing)
  it('should translate px to padding right/left in [sj] binding', () => {
    fixture.detectChanges();
    const h4: HTMLElement = fixture.nativeElement.querySelector('h4');
    const computedStyle = window.getComputedStyle(h4);
    expect(computedStyle.paddingLeft).toBe('32px');
    expect(computedStyle.paddingRight).toBe('32px');
  });

  // Test for py shorthand property
  it('should translate py to padding top/bottom in [sj] binding', () => {
    fixture.detectChanges();
    const h4: HTMLElement = fixture.nativeElement.querySelector('h4');
    const computedStyle = window.getComputedStyle(h4);
    expect(computedStyle.paddingTop).toBe('16px');
    expect(computedStyle.paddingBottom).toBe('16px');
  });

  // Test for mx shorthand property
  it('should translate mx to margin right/left in [sj] binding', () => {
    fixture.detectChanges();
    const h4: HTMLElement = fixture.nativeElement.querySelector('h4');
    const computedStyle = window.getComputedStyle(h4);
    expect(computedStyle.marginLeft).toBe('16px');
    expect(computedStyle.marginRight).toBe('16px');
  });

  // Test for my shorthand property
  it('should translate my to margin top/bottom in [sj] binding', () => {
    fixture.detectChanges();
    const h4: HTMLElement = fixture.nativeElement.querySelector('h4');
    const computedStyle = window.getComputedStyle(h4);
    expect(computedStyle.marginTop).toBe('16px');
    expect(computedStyle.marginBottom).toBe('16px');
  });

  // Test for bx shorthand property
  it('should translate bx to border right/left in [sj] binding', () => {
    fixture.detectChanges();
    const h4: HTMLElement = fixture.nativeElement.querySelector('h4');
    const computedStyle = window.getComputedStyle(h4);
    expect(computedStyle.borderLeftStyle).toBe('solid');
    expect(computedStyle.borderRightStyle).toBe('solid');
  });

  // Test for by shorthand property
  it('should translate by to border top/bottom in [sj] binding', () => {
    fixture.detectChanges();
    const h4: HTMLElement = fixture.nativeElement.querySelector('h4');
    const computedStyle = window.getComputedStyle(h4);
    expect(computedStyle.borderTopStyle).toBe('solid');
    expect(computedStyle.borderBottomStyle).toBe('solid');
  });


});





