import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyDatePickerComponent } from './weekly-date-picker.component';

describe('WeeklyDatePickerComponent', () => {
  let component: WeeklyDatePickerComponent;
  let fixture: ComponentFixture<WeeklyDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
