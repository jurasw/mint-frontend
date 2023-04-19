import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommentOptionsComponent } from './article-comment-options.component';

describe('ArticleCommentOptionsComponent', () => {
  let component: ArticleCommentOptionsComponent;
  let fixture: ComponentFixture<ArticleCommentOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCommentOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
