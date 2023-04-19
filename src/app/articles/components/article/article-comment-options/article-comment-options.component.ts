import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IArticleCommentReport } from 'src/app/articles/models/article-comment-report.model';
import { IArticleComment } from 'src/app/articles/models/article-comment.model';
import { ArticleService } from 'src/app/articles/services/article.service';
import { CommentService } from 'src/app/articles/services/comment.service';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { IMenuItem } from 'src/app/_core/models/menu-item.model';
import { UserService } from 'src/app/_core/services/user.service';

@Component({
  selector: 'app-article-comment-options',
  templateUrl: './article-comment-options.component.html',
  styleUrls: ['./article-comment-options.component.scss']
})
export class ArticleCommentOptionsComponent implements OnInit, OnDestroy {
  @Input() public comment!: IArticleComment;
  @Input() public report!: IArticleCommentReport;
  @Input() public showDeleteReportOption = false;
  @Output() public refresh$: EventEmitter<boolean> = new EventEmitter();
  public options: IMenuItem[] = [];
  private _subscription = new Subscription();
  private _dialogSubscription = new Subscription();
  constructor(
    private _dialog: MatDialog,
    private _userService: UserService,
    private _commentService: CommentService,
    private _articleService: ArticleService
  ) {}

  public ngOnInit(): void {
    this._setPostOptions();
  }

  public onOptionClick(item: IMenuItem): void {
    switch (this.options[this.options.indexOf(item)].action) {
      case 'deleteComment':
        this._deleteComment();
        break;
      case 'deleteReport':
        this._deleteReport();
        break;
      case 'blockUser':
        this._blockUser();
        break;
      case 'suspendUser':
        this._suspendUser();
        break;
    }
  }

  private _setPostOptions(): void {
    const deleteComment = {
      label: 'Usuń komentarz',
      action: 'deleteComment',
    };

    const deleteReport = {
      label: 'Usuń zgłoszenie',
      action: 'deleteReport',
    };

    const blockUser = {
      label: 'Zablokuj konto użytkownika',
      action: 'blockUser',
    };

    const suspendUser = {
      label: 'Zawieś konto użytkownika (30dni)',
      action: 'suspendUser',
    };
    this.options = [deleteComment, blockUser, suspendUser];
    if (this.report && this.showDeleteReportOption) {
      this.options.push(deleteReport);
    }
  }

  private _deleteComment(): void {
    this._unsubscribe();
    this._subscription = this._commentService
      .deleteComment(this.comment.postId, this.comment.id)
      .subscribe(() => {
        this.refresh$.next();
      });
  }

  private _deleteReport(): void {
    this._unsubscribe();
    this._subscription = this._articleService
      .deleteReport(this.comment.postId, this.report.id)
      .subscribe(() => {
        this.refresh$.next();
      });
  }

  private _suspendUser(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz zawiesić konto użytkownika ' +
          this.comment.user.nickName +
          ' na 30 dni?',
      },
    });
    this._dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._unsubscribe();
        this._subscription = this._userService
          .suspendUser(this.comment.user.id)
          .subscribe();
      }
    });
  }
  private _blockUser(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz zablokować konto użytkownika ' +
          this.comment.user.nickName +
          ' na stałe?',
      },
    });
    this._dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._unsubscribe();
        this._subscription = this._userService
          .blockUser(this.comment.user.id)
          .subscribe();
      }
    });
  }

  private _unsubscribe(): void {
    this._subscription.unsubscribe();
    this._subscription = new Subscription();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._dialogSubscription.unsubscribe();
  }
}
