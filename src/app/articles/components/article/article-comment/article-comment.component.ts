import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IArticleComment } from 'src/app/articles/models/article-comment.model';
import { IArticle } from 'src/app/articles/models/article.model';
import { CommentService } from 'src/app/articles/services/comment.service';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { ReactionsLogicDirective } from 'src/app/_core/directives/reactions-logic.directive';
import { IReactionView } from 'src/app/_core/models/reaction-view.model';
import { ReactionService } from 'src/app/_core/services/reaction.service';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
})
export class ArticleCommentComponent
  extends ReactionsLogicDirective
  implements OnInit
{
  @Input() public comment!: IArticleComment;
  @Input() public article!: IArticle;
  @Input() public isUserAdmin!: boolean;
  @Output() public quoteButtonClicked: EventEmitter<number> =
    new EventEmitter();
  @Output() public refreshComments$: EventEmitter<void> = new EventEmitter();
  public isQuoteFormOpen = false;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _reactionService: ReactionService,
    private _commentService: CommentService,
    private _dialog: MatDialog
  ) {
    super(_reactionService);
  }

  public ngOnInit(): void {
    if (this.comment) {
      super.setReactions(this.comment.reactions);
    }
  }

  public reactionClick(reaction: IReactionView): void {
    this._subscription.unsubscribe();
    this._subscription = new Subscription();
    this.setCurrentReactionState(reaction);
    this._subscription.add(
      this._commentService
        .reactToComment(
          this.article.id,
          this.comment.id,
          reaction.reactionId === this.currentReactionState.id &&
            this.currentReactionState.state
            ? null
            : reaction.reactionId
        )
        .subscribe(
          () => {},
          (error) => {
            this.revertReactionState(reaction);
          }
        )
    );
  }

  public refreshComments(): void {
    this.refreshComments$.emit();
  }

  public reportButtonClick(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz zgłosić komentarz użytkownika ' +
          this.comment.user.nickName +
          '?',
      },
    });
    this._subscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._commentService
          .reportComment(this.article.id, this.comment.id, 'nomessage')
          .subscribe();
      }
    });
  }

  public quoteButtonClick(): void {
    this.isQuoteFormOpen = !this.isQuoteFormOpen;
    this.quoteButtonClicked.emit(this.comment.id);
  }
}
