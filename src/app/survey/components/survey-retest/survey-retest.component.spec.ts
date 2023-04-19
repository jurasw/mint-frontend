import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRetestComponent } from './survey-retest.component';

describe('SurveyRetestComponent', () => {
  let component: SurveyRetestComponent;
  let fixture: ComponentFixture<SurveyRetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyRetestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyRetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
