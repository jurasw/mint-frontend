import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPsychComponent } from './about-psych.component';

describe('AboutPsychComponent', () => {
  let component: AboutPsychComponent;
  let fixture: ComponentFixture<AboutPsychComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutPsychComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPsychComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
