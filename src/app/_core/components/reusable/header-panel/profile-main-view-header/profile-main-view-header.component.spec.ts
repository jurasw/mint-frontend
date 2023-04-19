import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMainViewHeaderComponent } from './profile-main-view-header.component';

describe('ProfileMainViewHeaderComponent', () => {
  let component: ProfileMainViewHeaderComponent;
  let fixture: ComponentFixture<ProfileMainViewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMainViewHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMainViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
