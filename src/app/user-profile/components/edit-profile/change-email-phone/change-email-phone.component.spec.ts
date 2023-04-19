import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailPhoneComponent } from './change-email-phone.component';

describe('ChangeEmailPhoneComponent', () => {
  let component: ChangeEmailPhoneComponent;
  let fixture: ComponentFixture<ChangeEmailPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeEmailPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmailPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
