import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePanelComponent } from './edit-profile-panel.component';

describe('EditProfilePanelComponent', () => {
  let component: EditProfilePanelComponent;
  let fixture: ComponentFixture<EditProfilePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfilePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
