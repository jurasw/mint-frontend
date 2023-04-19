import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IForum } from 'src/app/forum/models/forum.interface';
import {
  IThread,
  IThreadResponse
} from 'src/app/forum/models/thread.interface';
import { ForumService } from 'src/app/forum/services/forum.service';
import { ThreadService } from 'src/app/forum/services/thread.service';
import {
  DEFAULT_PAGINATION,
  MAX_INT_VALUE
} from 'src/app/_core/constants/pagination.constant';
import {
  IPagination,
  IPaginationData
} from 'src/app/_core/models/pagination.model';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { PaginationService } from 'src/app/_core/services/pagination.service';
import { AddThreadModalComponent } from '../../threads/add-thread-modal/add-thread-modal.component';
import { WatchedThreadModalComponent } from '../../threads/watched-thread-modal/watched-thread-modal.component';
import { ModeratorRequestModalComponent } from '../moderators/moderator-request-modal/moderator-request-modal.component';

@Component({
  selector: 'app-main-forum',
  templateUrl: './main-forum.component.html',
  styleUrls: ['./main-forum.component.scss'],
})
export class MainForumComponent implements OnInit, OnDestroy {
  public forum!: IForum;
  public forumNotFound = false;
  public userPostCount!: number;
  public isForumLoading = false;
  public isThreadLoading = false;
  public threads: IThread[] = [];
  public allThreads: IThread[] = [];
  public allWatchedThreads: IThread[] = [];
  public pagination: IPagination = { ...DEFAULT_PAGINATION };
  public paginationData!: IPaginationData;
  public currentUser = this._authenticationService.currentUser;
  public isUserModerator = false;
  public isUserAdmin = this._authenticationService.isUserAdmin;
  public isUserSpecialist = this._authenticationService.isUserSpecialist;
  public showAllThreads: boolean = true;
  public showWatchedThreads: boolean = true;
  private _forumId!: number;
  private _subscription = new Subscription();
  private _threadSubscription = new Subscription();
  private _allThreadSubscription = new Subscription();
  private _forumSubscription = new Subscription();
  private _routerSubscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private _authenticationService: AuthenticationService,
    private _forumService: ForumService,
    private _threadService: ThreadService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _paginationService: PaginationService
  ) {
    this._subscribeToRoute();
  }

  public ngOnInit(): void {
    if (!this._forumId) {
      this._getData();
    }
  }

  public openDialog(): void {

    const dialogRef = this.dialog.open(AddThreadModalComponent);
    dialogRef.afterClosed().subscribe(
      (state) => {
        if (state) {
          this._getThreads();
        }
      },
      (err) => {
        if (err.status === 404) {
          this.isThreadLoading = false;
        }
      }
    );
  }

  public openDialogWatchedThreads(): void {
    const dialogRef = this.dialog.open(WatchedThreadModalComponent, {
      data: {
        forumId: this.forum.id,
      },
    });
    dialogRef.afterClosed().subscribe(
      (state) => {
        if (state) {
          this._getThreads();
        }
      },
      (err) => {
        if (err.status === 404) {
          this.isThreadLoading = false;
        }
      }
    );
  }

  public onPageChange(pageNumber: number): void {
    this.pagination.page = pageNumber;
    this._paginationService.onPageChange(
      pageNumber,
      this._router,
      this._activatedRoute,
      { top: 250, left: 0 }
    );
  }

  public openModeratorModalRequest(): void {
    this.dialog.open(ModeratorRequestModalComponent, {
      data: {
        forumId: this.forum.id,
      },
    });
  }

  private _getForum(): void {
    this._forumSubscription.unsubscribe();
    this._forumSubscription = new Subscription();
    this.isForumLoading = true;
    const getForum$: Observable<IForum> = this._forumService.get(this._forumId);
    this._forumSubscription = getForum$.subscribe(
      (data: IForum) => {
        this.forum = data;
        this.isUserModerator = !!data.moderators.filter(
          (user) =>
            this._authenticationService.currentUser &&
            +this._authenticationService.currentUser.id === user.id
        )[0];
        this.forumNotFound = false;
        this.isForumLoading = false;
      },
      (err) => {
        this.forumNotFound = false;
        this.isForumLoading = false;
      }
    );
  }

  private _getThreads(): void {
    this._threadSubscription.unsubscribe();
    this._threadSubscription = new Subscription();
    this.isThreadLoading = true;
    this.threads = [];
    const getThreads$: Observable<IThreadResponse & IPaginationData> =
      this._threadService.getAll(this._forumId, this.pagination);
    this._threadSubscription = getThreads$.subscribe(
      (data) => {
        this.paginationData = data;
        this.threads = data.items;
        this.isThreadLoading = false;
      },
      (err) => {
        this.isThreadLoading = false;
      }
    );
  }

  private _getAllThreads(): void {
    this._allThreadSubscription.unsubscribe();
    this._allThreadSubscription = new Subscription();
    this.isThreadLoading = true;
    this.allThreads = [];
    let myPagination = {
      limit: 9999999,
      page: 1,
    }
    const getAllThreads$: Observable<IThreadResponse & IPaginationData> =
      this._threadService.getAll(this._forumId, myPagination);
    this._allThreadSubscription = getAllThreads$.subscribe(
      (data) => {
        this.allThreads = data.items;
        this.isThreadLoading = false;
        this._getWatchedThreads();
      },
      (err) => {
        this.isThreadLoading = false;
      }
    );
  }

  private _getWatchedThreads(): void {
    this.allWatchedThreads = this.allThreads.filter(allThreads => allThreads.isSubscribed);
  }

  private _subscribeToRoute(): void {
    this._routerSubscription = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this._getData();
      });
  }

  private _getData(): void {
    const forumId = this._activatedRoute.snapshot.params['forum-id'];
    const queryParams = this._activatedRoute.snapshot.queryParams;
    this.pagination.page = queryParams.page || 1;
    if (this._forumId !== forumId) {
      this._forumId = forumId;
      this._getForum();
    }
    this._getUserPostCount();
    this._getThreads();
    this._getAllThreads();
  }

  private _getUserPostCount(): void {
    if (this._authenticationService.currentUser) {
      this._subscription = this._forumService
        .search(
          {
            userId: this._authenticationService.currentUser.id,
            subforumId: this._forumId,
          },
          {
            'PostPagination.Page': 1,
            'PostPagination.Limit': MAX_INT_VALUE,
            'ThreadPagination.Limit': MAX_INT_VALUE,
            'ThreadPagination.Page': 1,
          }
        )
        .subscribe((data) => {
          this.userPostCount = data.posts.items.length;
        });
    }
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._threadSubscription.unsubscribe();
    this._allThreadSubscription.unsubscribe();
    this._forumSubscription.unsubscribe();
    this._routerSubscription.unsubscribe();
  }

}