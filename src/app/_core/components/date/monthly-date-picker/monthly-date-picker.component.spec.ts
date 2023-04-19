import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDatePickerComponent } from './monthly-date-picker.component';

describe('MonthlyDatePickerComponent', () => {
  let component: MonthlyDatePickerComponent;
  let fixture: ComponentFixture<MonthlyDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
