import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IReportInfo } from 'src/app/forum/models/report.interface';
import { ReportService } from 'src/app/forum/services/report.service';
import { PaginationService } from 'src/app/_core/services/pagination.service';
import { ReportsLogicDirective } from '../reports.logic';

@Component({
  selector: 'app-post-report-list',
  templateUrl: './post-report-list.component.html',
  styleUrls: ['./post-report-list.component.scss'],
})
export class PostReportListComponent
  extends ReportsLogicDirective
  implements OnInit, OnDestroy
{
  private _routerSubscription = new Subscription();
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _paginationService: PaginationService,
    protected reportService: ReportService
  ) {
    super(reportService);
    this._subscribeToRoute();
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public onPageChange(pageNumber: number): void {
    this.pagination.page = pageNumber;
    this._paginationService.onPageChange(
      pageNumber,
      this._router,
      this._activatedRoute
    );
  }

  public navigateToPost(info: IReportInfo): void {
    if (info.status !== 1) {
      const page = Math.ceil(
        info.post.postRef / (this.paginationData.pageLimit || 1)
      );
      this._router.navigate(
        ['/forums/' + this.forumId + '/' + info.post.forumThreadId],
        {
          queryParams: { post: info.post.id, page },
        }
      );
    }
  }

  public refresh(): void {
    this.getPostReports(this.forumId);
  }

  private _getForumId(): void {
    this.forumId = +this._activatedRoute.snapshot.params['forum-id'];
  }

  private _subscribeToRoute(): void {
    this._routerSubscription = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this._getForumId();
        const queryParams = this._activatedRoute.snapshot.queryParams;
        this.pagination.page = queryParams.page || 1;
        this.getPostReports(this.forumId);
      });
  }

  public ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }
}
