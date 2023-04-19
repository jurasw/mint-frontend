import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleCommentComponent } from './add-article-comment.component';

describe('AddArticleCommentComponent', () => {
  let component: AddArticleCommentComponent;
  let fixture: ComponentFixture<AddArticleCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArticleCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
