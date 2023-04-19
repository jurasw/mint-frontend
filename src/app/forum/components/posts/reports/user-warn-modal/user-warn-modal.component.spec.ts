import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWarnModalComponent } from './user-warn-modal.component';

describe('UserWarnModalComponent', () => {
  let component: UserWarnModalComponent;
  let fixture: ComponentFixture<UserWarnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWarnModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWarnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
