import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  ISearchResponse,
  ISearchResult,
} from 'src/app/forum/models/search.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnChanges {
  @Input() public searchValue!: string;
  @Input() public searchResults!: ISearchResponse | undefined;
  @Input() public isLoading = false;
  @Input() public moreResultsLoading = false;
  @Output() public scrollBottom$: EventEmitter<void> = new EventEmitter();
  @Output() public resultClick$: EventEmitter<ISearchResult> =
    new EventEmitter();
  public numberOfResults = 0;
  constructor() {}

  @HostListener('window.scroll', ['$event'])
  public onSearchScroll(event: any): void {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      this.scrollBottom$.next();
    }
  }

  public ngOnChanges(): void {
    if (this.searchResults) {
      this.numberOfResults =
        this.searchResults.posts.items.length +
          this.searchResults.threads.items.length || 0;
    }
  }

  public onResultClick(
    type: 'thread' | 'post',
    forumId: number,
    threadId: number,
    postId?: number,
    postRef?: number
  ): void {
    if (type === 'post' && postRef && postId && this.searchResults) {
      const page = Math.ceil(
        postRef / (this.searchResults.posts.pageLimit || 1)
      );
      this.resultClick$.emit({ type, forumId, threadId, postId, page });
    } else {
      this.resultClick$.emit({ type, forumId, threadId, postId });
    }
  }
}
