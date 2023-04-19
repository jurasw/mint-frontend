import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArticleCommentReport } from 'src/app/articles/models/article-comment-report.model';
import { ArticleService } from 'src/app/articles/services/article.service';
import { DEFAULT_PAGINATION } from 'src/app/_core/constants/pagination.constant';
import { groupBy } from 'src/app/_core/functions/groupBy.function';

@Component({
  selector: 'app-article-reports',
  templateUrl: './article-reports.component.html',
  styleUrls: ['./article-reports.component.scss']
})
export class ArticleReportsComponent implements OnInit, OnDestroy {
  public pagination = {...DEFAULT_PAGINATION};
  public reports: IArticleCommentReport[] = [];
  public filteredReports: {[key: number]: IArticleCommentReport[]} = [];
  public articleId!: number;
  public isLoading = false;
  private _subscription = new Subscription();
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _articleService: ArticleService
  ) {
  }

  public ngOnInit(): void {
    this._getArticleId();
    this._getReports();
  }

  public onPageChange(pageNumber: number): void {
    this.pagination.page = pageNumber;
  }

  public refresh(): void {
    this._getReports();
  }

  private _getReports(): void {
    this._subscription = this._articleService.getArticleReports(this.articleId).subscribe((reports: IArticleCommentReport[]) => {
      this.reports = reports;
      this.reports = this._removeQuoteDataFromReportMessage(this.reports);
      this.filteredReports = groupBy(this.reports, (report) => report.commentId);
    });
  }

  private _removeQuoteDataFromReportMessage(reports: IArticleCommentReport[]): IArticleCommentReport[] {
    reports.forEach((report) => {
      if (report.comment.body.includes('</q>')) {
        report.comment.body = report.comment.body.split('</q>')[1];
      }
    });
    return reports;
  }

  private _getArticleId(): void {
    this.articleId = this._activatedRoute.snapshot.params.id;
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
