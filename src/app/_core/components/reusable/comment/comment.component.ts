import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArticleComment } from 'src/app/articles/models/article-comment.model';
import { IQuoteData } from 'src/app/forum/components/posts/post/post.component';
import { IAttachment, IPost } from 'src/app/forum/models/posts.interface';
import { IReactionView } from '../../../models/reaction-view.model';
import {
  IReactionData,
  ReactionNumbers,
  ReactionState
} from '../../../models/reaction.interface';
import { IUser } from '../../../models/user.interface';
import { AuthenticationService } from '../../../services/authentication.service';
import { DownloadService } from '../../../services/download.service';

interface ICommentAdapter {
  id: number;
  body: string;
  refNumber: number;
  createdAt: string;
  updatedAt: string;
  author: IUser;
  authorId: number;
  reactions: IReactionData[];
  attachments?: IAttachment[];
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() public forumPost: IPost | undefined;
  @Input() public articleComment: IArticleComment | undefined;
  @Input() public commentTitle = '';
  @Input() public showQuoteButton = true;
  @Input() public isQuoteFormOpen = false;
  @Input() public isFirstComment = false;
  @Input() public isReported = false;
  @Input() public reactionNumbers!: ReactionNumbers;
  @Input() public reactionState!: ReactionState[];
  @Input() public reactions!: IReactionView[];
  @Output() public reactionClicked$: EventEmitter<IReactionView> =
    new EventEmitter();
  @Output() public reportButtonClicked$: EventEmitter<void> =
    new EventEmitter();
  @Output() public quoteButtonClicked$: EventEmitter<number> =
    new EventEmitter();
  public comment!: ICommentAdapter;
  public quoteData!: IQuoteData;
  public isOwnComment!: boolean;
  public isLoggedUser: boolean = false;
  private _subscription: Subscription = new Subscription();

  constructor(
    public router: Router,
    private _downloadService: DownloadService,
    private _authService: AuthenticationService
  ) { }

  public ngOnInit(): void {
    this.setComment();
    this.isOwnComment =
      this._authService.currentUser ? this._authService.currentUser.id === this.comment.authorId : false;
    this._setQuoteAnswer();
    if (this._authService.currentUser) {
      this.isLoggedUser = true;
    }
  }

  public reactionClick(reaction: IReactionView): void {
    this.reactionClicked$.emit(reaction);
  }

  public reportButtonClick(): void {
    this.reportButtonClicked$.emit();
  }

  public quoteButtonClick(): void {
    this.quoteButtonClicked$.emit(this.comment.id);
  }

  public showUserProfile(id: any): void {
    this.router.navigate(['/user-profile/' + id]);
    window.scrollTo({ top: 0 });
  }

  public downloadFile(file: IAttachment): void {
    this._downloadService
      .downloadFileFromUrl(file.filePath)
      .subscribe((data) => {
        const url = window.URL.createObjectURL(data);
        window.open(url);
      });
  }

  private setComment(): void {
    if (this.forumPost) {
      this.comment = {
        author: this.forumPost.author,
        authorId: this.forumPost.authorId,
        body: this.forumPost.body,
        createdAt: this.forumPost.createdAt,
        id: this.forumPost.id,
        reactions: this.forumPost.reactions,
        refNumber: this.forumPost.postRef,
        attachments: this.forumPost.attachments,
        updatedAt: this.forumPost.updatedAt,
      };
    } else if (this.articleComment) {
      this.comment = {
        author: this.articleComment.user,
        authorId: this.articleComment.userId,
        body: this.articleComment.body,
        createdAt: this.articleComment.createdAt,
        id: this.articleComment.id,
        reactions: this.articleComment.reactions,
        refNumber: this.articleComment.refNumber,
        attachments: [],
        updatedAt: this.articleComment.updatedAt,
      };
    }
  }

  private _setQuoteAnswer(): void {
    const regex = /<q>[^]*<\/q>/;
    const quote = this.comment.body.match(regex);
    if (quote !== null) {
      this.comment.body = this.comment.body.replace(quote[0], '');
      const quoteArray = quote[0]
        .replace('<q>', '')
        .replace('</q>', '')
        .split(',');
      this.quoteData = {
        refNumber: +quoteArray[0],
        quoteAuthorName: quoteArray[1],
        quoteBody: quoteArray[2],
      };
    }
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
