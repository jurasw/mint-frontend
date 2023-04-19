import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfPostsModalComponent } from './history-of-posts-modal.component';

describe('HistoryOfPostsModalComponent', () => {
  let component: HistoryOfPostsModalComponent;
  let fixture: ComponentFixture<HistoryOfPostsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryOfPostsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfPostsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
