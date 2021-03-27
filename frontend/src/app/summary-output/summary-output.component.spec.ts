import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOutputComponent } from './summary-output.component';

describe('SummaryOutputComponent', () => {
  let component: SummaryOutputComponent;
  let fixture: ComponentFixture<SummaryOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
