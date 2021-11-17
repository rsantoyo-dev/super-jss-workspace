import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperJssComponent } from './super-jss.component';

describe('SuperJssComponent', () => {
  let component: SuperJssComponent;
  let fixture: ComponentFixture<SuperJssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperJssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperJssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
