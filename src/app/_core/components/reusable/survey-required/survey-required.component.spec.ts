import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRequiredComponent } from './survey-required.component';

describe('SurveyRequiredComponent', () => {
  let component: SurveyRequiredComponent;
  let fixture: ComponentFixture<SurveyRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyRequiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
