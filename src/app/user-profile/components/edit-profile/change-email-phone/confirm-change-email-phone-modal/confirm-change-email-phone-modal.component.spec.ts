import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmChangeEmailPhoneModalComponent } from './confirm-change-email-phone-modal.component';

describe('ConfirmChangeEmailPhoneModalComponent', () => {
  let component: ConfirmChangeEmailPhoneModalComponent;
  let fixture: ComponentFixture<ConfirmChangeEmailPhoneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmChangeEmailPhoneModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmChangeEmailPhoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
