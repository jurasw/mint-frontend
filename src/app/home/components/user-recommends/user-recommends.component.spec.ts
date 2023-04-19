import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecommendsComponent } from './user-recommends.component';

describe('UserRecommendsComponent', () => {
  let component: UserRecommendsComponent;
  let fixture: ComponentFixture<UserRecommendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRecommendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRecommendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
