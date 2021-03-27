import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryInputComponent } from './summary-input.component';

describe('SummaryInputComponent', () => {
  let component: SummaryInputComponent;
  let fixture: ComponentFixture<SummaryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
