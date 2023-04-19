import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileLayoutComponent } from './edit-profile-layout.component';

describe('EditProfileLayoutComponent', () => {
  let component: EditProfileLayoutComponent;
  let fixture: ComponentFixture<EditProfileLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
