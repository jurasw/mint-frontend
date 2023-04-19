import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleReportsComponent } from './article-reports.component';

describe('ArticleReportsComponent', () => {
  let component: ArticleReportsComponent;
  let fixture: ComponentFixture<ArticleReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
