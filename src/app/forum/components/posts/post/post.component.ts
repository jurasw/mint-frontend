import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/forum/models/posts.interface';
import { PostService } from 'src/app/forum/services/post.service';
import { ReportService } from 'src/app/forum/services/report.service';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { ReactionsLogicDirective } from 'src/app/_core/directives/reactions-logic.directive';
import { IReactionView } from 'src/app/_core/models/reaction-view.model';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { DownloadService } from 'src/app/_core/services/download.service';
import { ReactionService } from 'src/app/_core/services/reaction.service';

export interface IQuoteData {
  refNumber: number;
  quoteAuthorName: string;
  quoteBody: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent
  extends ReactionsLogicDirective
  implements OnInit, OnDestroy
{
  @Input() public post!: IPost;
  @Input() public title = '';
  @Input() public threadId!: number;
  @Input() public forumId!: number;
  @Input() public showQuoteButton = true;
  @Input() public isQuoteFormOpen = false;
  @Input() public isFirstPost = false;
  @Input() public isReported = false;
  @Input() public isUserAdmin!: boolean;
  @Input() public isUserModerator!: boolean;
  @Output() public quoteButtonClicked: EventEmitter<number> =
    new EventEmitter();
  @Output() public refreshThread$: EventEmitter<boolean> = new EventEmitter();
  private _subscription: Subscription = new Subscription();

  constructor(
    public router: Router,
    private _postService: PostService,
    private _dialog: MatDialog,
    private _reactionService: ReactionService,
    private _reportService: ReportService,
    private _downloadService: DownloadService,
    private _activatedRoute: ActivatedRoute,
    private _authenticationService: AuthenticationService
  ) {
    super(_reactionService);
  }

  public ngOnInit(): void {
    super.setReactions(this.post.reactions);
  }

  public reactionClick(reaction: IReactionView): void {
    this._subscription.unsubscribe();
    this._subscription = new Subscription();
    this.setCurrentReactionState(reaction);
    this._subscription.add(
      this._postService
        .react(
          this.forumId,
          this.threadId,
          this.post.id,
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

  public reportButtonClick(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz zgłosić komentarz użytkownika ' +
          this.post.author.nickName +
          '?',
      },
    });
    this._subscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._reportService
          .report(this.forumId, this.threadId, this.post.id, 'nomessage')
          .subscribe(
            (data) => {
              this.refreshThread();
            },
            (error) => {}
          );
      }
    });
  }

  public quoteButtonClick(): void {
    this.quoteButtonClicked.emit(this.post.id);
  }

  public refreshThread(): void {
    this.refreshThread$.next();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
