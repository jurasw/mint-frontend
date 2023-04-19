import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerResultsComponent } from './organizer-results.component';

describe('OrganizerResultsComponent', () => {
  let component: OrganizerResultsComponent;
  let fixture: ComponentFixture<OrganizerResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
