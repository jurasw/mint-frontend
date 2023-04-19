import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IArticleCommentResponse } from 'src/app/articles/models/article-comment.model';
import { IArticle } from 'src/app/articles/models/article.model';
import { ArticleService } from 'src/app/articles/services/article.service';
import { CommentService } from 'src/app/articles/services/comment.service';
import { DEFAULT_PAGINATION } from 'src/app/_core/constants/pagination.constant';
import { IPaginationData } from 'src/app/_core/models/pagination.model';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { DownloadService } from 'src/app/_core/services/download.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  @ViewChildren('comment') public commentElements!: QueryList<ElementRef>;
  public comments$!: Observable<IArticleCommentResponse & IPaginationData>;
  public commentsLength!: number;
  public article$!: Observable<IArticle>;
  public articleId!: number;
  public isLoading = false;
  public pagination = { ...DEFAULT_PAGINATION };
  public paginationData!: IPaginationData;
  public isCommentsLoading = false;
  public showQuoteForm = false;
  public quoteIdComment = -1;
  public isUserAdmin = false;
  public showAddCommentPanel: boolean = false;
  public format!: string;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _articleService: ArticleService,
    private _downloadService: DownloadService,
    private _commentService: CommentService,
    private _authService: AuthenticationService
  ) {
    this._subscribeToRouteChange();
  }

  public ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.isUserAdmin = this._authService.isUserAdmin;
    this._authService.currentUser ? this.showAddCommentPanel = true : this.showAddCommentPanel = false;
    console.log()
  }

  public onPageChange(pageNumber: number): void {
    this.pagination.page = pageNumber;
    this._getComments();
  }

  public refreshComments(): void {
    this._getComments();
  }

  public onQuoteButtonClick(id: number): void {
    if (id !== this.quoteIdComment) {
      this.showQuoteForm = true;
    } else {
      this.showQuoteForm = !this.showQuoteForm;
    }
    this.quoteIdComment = id;
  }

  public onAddComment(): void {
    this.pagination.page = 1;
    this._getComments();
    this.commentElements.get(0)?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  private _getComments(): void {
    this.isCommentsLoading = true;
    const getCommentsWithPagination$ = this._commentService.getComments(
      this.articleId,
      this.pagination
    );
    this.comments$ = getCommentsWithPagination$
      .pipe(
        tap((data: IArticleCommentResponse & IPaginationData) => {
          this.isCommentsLoading = false;
          this.paginationData = data;
        })
      );
  }

  private _getArticle(): void {
    this.isLoading = true;
    this.article$ = this._articleService.getArticle(this.articleId).pipe(
      map((article) => {
        article.thumbnail.type.includes("image") ? this.format = "image" : this.format = "video";
        return article;
      }), 
      tap(() => {
        this.isLoading = false;
      })
    );
  }

  public _subscribeToRouteChange(): void {
    this._activatedRoute.params.subscribe(() => {
      this.articleId = this._activatedRoute.snapshot.params.id;
      if (this.articleId !== undefined) {
        this._getArticle();
        this._getComments();
      }
    });
  }
}
