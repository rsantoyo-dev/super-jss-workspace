import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteComponent } from './palette.component';

describe('PaletteComponent', () => {
  let component: PaletteComponent;
  let fixture: ComponentFixture<PaletteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaletteComponent]
    });
    fixture = TestBed.createComponent(PaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
