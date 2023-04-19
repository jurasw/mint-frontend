import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditArticleComponent } from './components/add-edit-article/add-edit-article.component';
import { ArticleDetailsComponent } from './components/article/article-details/article-details.component';
import { ArticleReportsComponent } from './components/article/article-reports/article-reports.component';
import { ArticlesViewComponent } from './components/articles-view/articles-view.component';
const routes: Routes = [
  { path: '', component: ArticlesViewComponent },
  { path: 'add-article', component: AddEditArticleComponent },
  { path: 'edit-article/:id', component: AddEditArticleComponent },
  { path: 'article-details/:id', component: ArticleDetailsComponent },
  { path: 'article-reports/:id', component: ArticleReportsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
