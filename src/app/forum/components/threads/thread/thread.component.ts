import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { filter, mergeMap, take } from 'rxjs/operators';
import { IPost, IPostResponse } from 'src/app/forum/models/posts.interface';
import {
  IReport,
  IReportResponse
} from 'src/app/forum/models/report.interface';
import { IThread } from 'src/app/forum/models/thread.interface';
import { PostService } from 'src/app/forum/services/post.service';
import { ReportService } from 'src/app/forum/services/report.service';
import { ThreadService } from 'src/app/forum/services/thread.service';
import {
  DEFAULT_LIMIT_PER_PAGE,
  DEFAULT_PAGINATION,
  MAX_INT_VALUE
} from 'src/app/_core/constants/pagination.constant';
import {
  IPagination,
  IPaginationData
} from 'src/app/_core/models/pagination.model';
import { AnimationService } from 'src/app/_core/services/animation.service';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { PaginationService } from 'src/app/_core/services/pagination.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements OnInit, OnDestroy {
  @ViewChildren('post', { read: ElementRef })
  public postElements!: QueryList<ElementRef>;
  public posts: IPost[] = [];
  public thread!: IThread | undefined;
  public reports!: IReport[];
  public threadNotFound = false;
  public isThreadLoading = false;
  public isPostLoading = false;
  public showQuoteForm = false;
  public quoteIdPost = -1;
  public isThreadSubscribed = false;
  public mainPost!: IPost;
  public pagination: IPagination = { ...DEFAULT_PAGINATION };
  public paginationData!: IPaginationData;
  public currentUser = this._authenticationService.currentUser;
  public isUserModerator = false;
  public isUserAdmin = this._authenticationService.isUserAdmin;
  private _routerSubscription = new Subscription();
  private _threadSubscription = new Subscription();
  private _postsSubscription = new Subscription();
  private _threadId!: number;
  private _forumId!: number;
  constructor(
    private _threadService: ThreadService,
    private _postService: PostService,
    private _reportService: ReportService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _animationService: AnimationService,
    private _paginationService: PaginationService,
    private _authenticationService: AuthenticationService,
    private _renderer: Renderer2
  ) {
    this._subscribeToRoute();
  }

  public ngOnInit(): void {
    if (!this._threadId) {
      this._getData();
    } else {
      this._readThread();
    }
  }

  public openDialog(): void {}

  public onAddPost(id: number): void {
    this._getPosts(id, this.posts.length === this.pagination.limit);
  }

  public refreshThread(): void {
    this._getThread();
    this._getPosts();
  }

  public onQuoteButtonClick(idPost: number): void {
    if (idPost !== this.quoteIdPost) {
      this.showQuoteForm = true;
    } else {
      this.showQuoteForm = !this.showQuoteForm;
    }
    this.quoteIdPost = idPost;
  }

  public onWatchedThread(): void {
    const threadSubscribe$ = this._threadService.subThread(
      this._forumId,
      this._threadId
    );
    const threadUnsubscribe$ = this._threadService.unsubThread(
      this._forumId,
      this._threadId
    );
    const threadObservable$ = this.isThreadSubscribed
      ? threadUnsubscribe$
      : threadSubscribe$;
    this._threadSubscription = threadObservable$.subscribe(
      () => {
        this.isThreadSubscribed
          ? (this.isThreadSubscribed = false)
          : (this.isThreadSubscribed = true);
      },
      (err) => {}
    );
  }

  public onPageChange(pageNumber: number): void {
    this.pagination.page = pageNumber;
    this._paginationService.onPageChange(
      pageNumber,
      this._router,
      this._activatedRoute
    );
  }

  private _readThread(): void {
    if (this.thread && !this.thread.isRead) {
      this._threadService.read(this.thread.id).pipe(take(1)).subscribe(() => {
        if (this.thread) {
          this.thread.isRead = true;
        }
      });
    }
  }

  private _getThread(): void {
    this.thread = undefined;
    this.isThreadLoading = true;
    this._threadSubscription = this._threadService
      .get(this._forumId, this._threadId)
      .subscribe(
        (data: IThread) => {
          this.threadNotFound = false;
          this.isThreadLoading = false;
          this.thread = data;
          this._readThread();
          this.isUserModerator = !!data.subforum.moderators.filter(
            (user) => this._authenticationService.currentUser && +this._authenticationService.currentUser.id === user.id
          )[0];
          this.isThreadSubscribed = data.isSubscribed;
        },
        (err) => {
          this.isThreadLoading = false;
          this.threadNotFound = true;
        }
      );
  }

  private _getPosts(postIdNavigation = NaN, navigateToLastPage = false): void {
    this.posts = [];
    this.isPostLoading = true;
    const ADMIN_ROLE = this._authenticationService.currentUser ? this._authenticationService.currentUser.role === 'Admin' : false;
    const getPostsWithPagination = this._postService.getPosts(
      this._forumId,
      this._threadId,
      this.pagination
    );
    const getPosts$ = navigateToLastPage
      ? getPostsWithPagination.pipe(
          mergeMap((data: IPostResponse & IPaginationData) =>
            this._postService.getPosts(this._forumId, this._threadId, {
              page: data.totalPages,
              limit: DEFAULT_LIMIT_PER_PAGE,
            })
          )
        )
      : getPostsWithPagination;
    const getReports$ = this._reportService.getUserReports(this._forumId, {
      page: 1,
      limit: MAX_INT_VALUE,
    });
    const getData$: Observable<
      | [IPostResponse & IPaginationData, IReportResponse]
      | [IPostResponse & IPaginationData]
    > = ADMIN_ROLE ? forkJoin([getPosts$, getReports$]) : forkJoin([getPosts$]);
    this._postsSubscription = getData$.subscribe(
      (data) => {
        this.isPostLoading = false;
        this.showQuoteForm = false;
        this.posts = data[0].items;
        this.paginationData = data[0];
        this.pagination.page = this.paginationData.currentPage;
        if (data[1]) {
          this.reports = data[1].items;
          this.posts.forEach((post) => {
            post.reports = [];
            this.reports.forEach((report) => {
              if (post.id === report.postId) {
                post.reports?.push(report);
              }
            });
          });
        }
        this.mainPost = this.posts[0];
        if (postIdNavigation) {
          this._navigateToPost(postIdNavigation);
        }
      },
      (err) => {
        this.isPostLoading = false;
      }
    );
  }

  private _navigateToPost(postId: number): void {
    setTimeout(() => {
      const postElement = this.postElements.filter(
        (post) => +post.nativeElement.id === +postId
      )[0];
      if (postElement && postElement.nativeElement) {
        postElement.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        this._animationService.addAnimation(
          this._renderer,
          postElement.nativeElement.firstChild,
          'blink-element'
        );
        this._animationService.removeAnimation(
          this._renderer,
          postElement.nativeElement,
          'blink-element',
          1000
        );
      }
    }, 0);
  }

  private _subscribeToRoute(): void {
    this._routerSubscription = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this._getData();
      });
  }

  private _getData(): void {
    const forumId = this._activatedRoute.snapshot.params['forum-id'];
    const threadId = this._activatedRoute.snapshot.params['thread-id'];
    const queryParams = this._activatedRoute.snapshot.queryParams;
    const postId = queryParams.post;
    const currentPage = this.pagination.page;
    this.pagination.page = queryParams.page || 1;
    if (this._threadId !== +threadId) {
      this._forumId = +forumId;
      this._threadId = +threadId;
      this._getThread();
      if (postId) {
        this._getPosts(+postId);
      } else {
        this._getPosts(NaN, !queryParams.page);
      }
    } else if (postId && +currentPage === +queryParams.page) {
      this._navigateToPost(+postId);
    } else if (postId && +currentPage !== +queryParams.page) {
      this._getPosts(+postId);
    } else {
      this._getPosts(NaN, !queryParams.page);
    }
  }

  public ngOnDestroy(): void {
    this._threadSubscription.unsubscribe();
    this._routerSubscription.unsubscribe();
    this._postsSubscription.unsubscribe();
  }
}
