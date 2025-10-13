import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SjCardComponent } from './sj-card.component';

describe('SjCardComponent', () => {
  let component: SjCardComponent;
  let fixture: ComponentFixture<SjCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SjCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SjCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
