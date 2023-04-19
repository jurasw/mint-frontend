import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../_core/_core.module';
import { ArticlesRoutingModule } from './articles.routing';
import { AddEditArticleComponent } from './components/add-edit-article/add-edit-article.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticlesViewComponent } from './components/articles-view/articles-view.component';
import { ArticleService } from './services/article.service';
import { CommentService } from './services/comment.service';
import { ArticleOptionsComponent } from './components/article/article-options/article-options.component';
import { ArticleDetailsComponent } from './components/article/article-details/article-details.component';
import { ArticleCommentComponent } from './components/article/article-comment/article-comment.component';
import { AddArticleCommentComponent } from './components/article/add-article-comment/add-article-comment.component';
import { ArticleCommentOptionsComponent } from './components/article/article-comment-options/article-comment-options.component';
import { ArticleReportsComponent } from './components/article/article-reports/article-reports.component';
import { QuillModule } from 'ngx-quill'; 

@NgModule({
  declarations: [
    ArticlesViewComponent,
    ArticleComponent,
    AddEditArticleComponent,
    ArticleOptionsComponent,
    ArticleDetailsComponent,
    ArticleCommentComponent,
    AddArticleCommentComponent,
    ArticleCommentOptionsComponent,
    ArticleReportsComponent
  ],
  providers: [
    ArticleService, CommentService
  ],
  imports: [
    CommonModule,
    CoreModule,
    ArticlesRoutingModule,
    QuillModule
  ],
})
export class ArticlesModule { }
