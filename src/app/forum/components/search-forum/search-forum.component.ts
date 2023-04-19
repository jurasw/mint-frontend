import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FORUMS } from 'src/app/_core/constants/forums.constant';
import { DEFAULT_SEARCH_PAGINATION } from 'src/app/_core/constants/pagination.constant';
import { IOption } from 'src/app/_core/models/option.interface';
import { IPaginationData } from 'src/app/_core/models/pagination.model';
import {
  IPostPagination,
  IThreadPagination
} from '../../models/forum-pagination.interface';
import { IPost } from '../../models/posts.interface';
import {
  ISearchParams,
  ISearchResponse,
  ISearchResult
} from '../../models/search.interface';
import { IThread } from '../../models/thread.interface';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-search-forum',
  templateUrl: './search-forum.component.html',
  styleUrls: ['./search-forum.component.scss'],
})
export class SearchForumComponent implements OnInit, OnDestroy {
  public searchForm = new FormGroup({
    searchControl: new FormControl(''),
    filterDropdown: new FormControl(null),
  });
  public searchOptions: IOption[] = [
    {
      displayName: 'Wszystko na forum',
      value: 'all',
    },
    {
      displayName: 'Obserwowane', 
      value: 'subscribed',
    },
  ];
  public searchResults!: ISearchResponse | undefined;
  public isLoading = false;
  public moreResultsLoading = false;
  private _pagination: IThreadPagination & IPostPagination = {
    ...DEFAULT_SEARCH_PAGINATION,
  };
  private _threadPaginationData!: IPaginationData;
  private _postPaginationData!: IPaginationData;
  private _subscription = new Subscription();
  private _routerSubscription = new Subscription();
  private searchParams: ISearchParams = {};
  constructor(
    public elementRef: ElementRef,
    private _forumService: ForumService,
    private _router: Router
  ) {
    this._setCurrentUrlOnRouteChange();
  }

  public ngOnInit(): void {
    this._addForumsToSearchOptions();
    this._triggerSearchOnValueChange();
  }

  public onClickOutside(): void {
    this._resetSearchForm();
  }

  public onScrollBottom(): void {
    const threadLimitExceeded =
      this._threadPaginationData.totalPages ===
      this._pagination['ThreadPagination.Page'];
    const postLimitExceeded =
      this._postPaginationData.totalPages ===
      this._pagination['PostPagination.Page'];
    if (!this.isLoading && (!threadLimitExceeded || !postLimitExceeded)) {
      if (!threadLimitExceeded) {
        this._pagination['ThreadPagination.Page']++;
      }
      if (!postLimitExceeded) {
        this._pagination['PostPagination.Page']++;
      }
      this._search(true);
    }
  }

  public onResultClick(result: ISearchResult): void {
    this._resetSearchForm();
    if (result.type === 'thread') {
      this._router.navigate([
        '/forums/' + result.forumId + '/' + result.threadId,
      ]);
    } else if (result.type === 'post') {
      this._router.navigate(
        ['/forums/' + result.forumId + '/' + result.threadId],
        {
          queryParams: { post: result.postId, page: result.page },
        }
      );
    }
  }

  private _resetSearchForm(): void {
    this.searchForm.controls.searchControl.setValue('');
    this.searchResults = undefined;
  }

  private _triggerSearchOnValueChange(): void {
    this.searchForm.valueChanges.subscribe((changes: any) => {
      this._pagination = { ...DEFAULT_SEARCH_PAGINATION };
      if (changes.searchControl) {
        if (changes.searchControl.length >= 3) {
          this.searchParams.text = changes.searchControl;
          this._search();
        } else {
          this.searchResults = undefined;
        }
      }
    });
  }

  private _search(moreResults = false): void {
    if (moreResults) {
      this.moreResultsLoading = true;
    } else {
      this.isLoading = true;
    }
    this._subscription.unsubscribe();
    this._subscription = this._forumService
      .search(this.searchParams, this._pagination)
      .pipe(
        map((data: ISearchResponse) => {
          const filterValue = this.searchForm.controls.filterDropdown.value;
          switch (filterValue) {
            case 'all':
              break;
            case 'subscribed':
              data.posts.items = data.posts.items.filter(
                (post: IPost) => post.forumThread.isSubscribed
              );
              data.threads.items = data.threads.items.filter(
                (thread: IThread) => thread.isSubscribed
              );
              break;
            default:
              data.posts.items = data.posts.items.filter(
                (post: IPost) => +post.forumThread.subforumId === +filterValue
              );
              data.threads.items = data.threads.items.filter(
                (thread: IThread) => +thread.subforumId === +filterValue
              );
          }
          return this._filterQuotePost(data);
        })
      )
      .subscribe(
        (data: ISearchResponse) => {
          if (moreResults) {
            this.searchResults?.posts.items.push(...data.posts.items);
            this.searchResults?.threads.items.push(...data.threads.items);
          } else {
            this.searchResults = data;
          }
          this._threadPaginationData = data.threads;
          this._postPaginationData = data.posts;
          this.isLoading = false;
          this.moreResultsLoading = false;
        },
        (err) => {
          this.isLoading = false;
          this.moreResultsLoading = false;
        }
      );
  }

  private _filterQuotePost(data: ISearchResponse): ISearchResponse {
    data.posts.items = data.posts.items.filter(
      (post: IPost) => !post.body.includes('<q>')
    );
    return data;
  }

  private _setCurrentUrlOnRouteChange(): void {
    this._routerSubscription = this._router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        const forumId = event.url.replace('/forums/', '')[0];
        if (Number(+forumId)) {
          this.searchForm.controls.filterDropdown.setValue(+forumId);
        } else {
          this.searchForm.controls.filterDropdown.setValue('all');
        }
      });
  }

  private _addForumsToSearchOptions(): void {
    for (let i = 0; i < FORUMS.length; i++) {
      this.searchOptions.push({
        value: i + 1,
        displayName: FORUMS[i],
      });
    }
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._routerSubscription.unsubscribe();
  }
}
