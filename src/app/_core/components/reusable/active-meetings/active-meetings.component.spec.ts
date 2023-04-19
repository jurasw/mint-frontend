import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMeetingsComponent } from './active-meetings.component';

describe('ActiveMeetingsComponent', () => {
  let component: ActiveMeetingsComponent;
  let fixture: ComponentFixture<ActiveMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveMeetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
