import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistRegistrationComponent } from './specialist-registration.component';

describe('SpecialistRegistrationComponent', () => {
  let component: SpecialistRegistrationComponent;
  let fixture: ComponentFixture<SpecialistRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
