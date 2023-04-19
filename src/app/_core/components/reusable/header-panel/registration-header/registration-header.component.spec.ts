import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationHeaderComponent } from './registration-header.component';

describe('RegistrationHeaderComponent', () => {
  let component: RegistrationHeaderComponent;
  let fixture: ComponentFixture<RegistrationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
