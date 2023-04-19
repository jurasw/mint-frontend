import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IPagination, IPaginationData } from 'src/app/_core/models/pagination.model';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { DownloadService } from 'src/app/_core/services/download.service';
import { IArticleResponse } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-articles-view',
  templateUrl: './articles-view.component.html',
  styleUrls: ['./articles-view.component.scss'],
})
export class ArticlesViewComponent implements OnInit, OnDestroy {
  public articles!: IArticleResponse & IPaginationData;
  public isLoading = false;
  public moreResultsLoading = false;
  public showAddArticleButton = false;
  public pagination: IPagination = { page: 1, limit: 4 };
  public paginationData!: IPaginationData;
  public isLoggedUser: boolean = false;
  private _articleSubscription: Subscription = new Subscription();
  private _routerSubscription: Subscription = new Subscription();
  constructor(
    public router: Router,
    private _authService: AuthenticationService,
    private _articleService: ArticleService,
    private _downloadService: DownloadService
  ) { }

  public ngOnInit(): void {
    this.showAddArticleButton = this._authService.isUserWorker;
    this._getArticles();
    if (this._authService.currentUser) {
      this.isLoggedUser = true;
    }
  }

  public onArticleDelete(articleId: number): void {
    this.articles.items = this.articles.items.filter((a) => a.id !== articleId);
  }

  public loadMoreArticles(): void {
    this.pagination.page++;
    this.pagination.limit = 12;
    this._getArticles(true);
  }

  public onPageChange(pageNumber: number): void {
    this.pagination.page = pageNumber;
    window.scrollTo(0, 500);
    this._getArticles();
  }

  private _getArticles(moreResults = false): void {
    if (moreResults) {
      this.moreResultsLoading = true;
    } else {
      this.isLoading = true;
    }
    (this._authService.currentUser ? this._articleService.getAll(this.pagination) : this._articleService.getThree())
      .pipe(
        tap((data: IArticleResponse & IPaginationData) => {
          this.paginationData = data;
        })
      )
      .subscribe(data => {
        if (moreResults) {
          this.moreResultsLoading = false;
          if (data.items.length > 0) {
            this.articles.items.push(...data.items);
          }
        } else {
          this.isLoading = false;
          this.articles = data;
        }
      });
  }

  public ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
    this._articleSubscription.unsubscribe();
  }
}
