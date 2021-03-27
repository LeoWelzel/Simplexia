import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcronymsListComponent } from './acronyms-list.component';

describe('AcronymsListComponent', () => {
  let component: AcronymsListComponent;
  let fixture: ComponentFixture<AcronymsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcronymsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcronymsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
