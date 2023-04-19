import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorRequestsForumComponent } from './moderator-requests-forum.component';

describe('ModeratorRequestsForumComponent', () => {
  let component: ModeratorRequestsForumComponent;
  let fixture: ComponentFixture<ModeratorRequestsForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorRequestsForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorRequestsForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
