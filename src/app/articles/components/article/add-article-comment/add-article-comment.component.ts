import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IArticleComment } from 'src/app/articles/models/article-comment.model';
import { CommentService } from 'src/app/articles/services/comment.service';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-add-article-comment',
  templateUrl: './add-article-comment.component.html',
  styleUrls: ['./add-article-comment.component.scss']
})
export class AddArticleCommentComponent implements OnInit, OnDestroy {
  @Input() public articleId!: number;
  @Input() public quoteComment?: IArticleComment;
  @Output() public commentAdded$: EventEmitter<number> = new EventEmitter();
  public addCommentForm = new FormGroup({
    answer: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(2200),
    ]),
  });
  public placeholder = 'Wpisz swoją odpowiedź';
  public isSending = false;
  private _subscription = new Subscription();
  constructor(
    public authenticationService: AuthenticationService,
    private _commentService: CommentService
  ) {}

  public ngOnInit(): void {
    if (this.quoteComment) {
      const author = this.quoteComment.user.nickName;
      this.placeholder = `Odpowiedz na komentarz użytkownika ${author} o numerze #${this.quoteComment.refNumber}`;
    }
  }

  public sendAnswer(): void {
    this._subscription.unsubscribe();
    this.isSending = true;
    let body: string;

    if (this.quoteComment) {
      if (this.quoteComment.body.includes('</q>')) {
        this.quoteComment = this._removePreviousQuoteDataFromPost(this.quoteComment);
      }
      body = `<q>${this.quoteComment.refNumber},${this.quoteComment.user.nickName},${this.quoteComment.body.slice(0, 100)}...</q>` +
      this.addCommentForm.controls.answer.value;
    } else {
      body = this.addCommentForm.controls.answer.value;
    }
    this._subscription = this._commentService
      .addComment(this.articleId, body)
      .subscribe(
        (data) => {
          this.commentAdded$.emit();
          this.addCommentForm.controls.answer.reset();
          this.isSending = false;
        },
        (err) => {
          this.isSending = false;
          window.scrollTo({top: 0});
        }
      );
  }

  private _removePreviousQuoteDataFromPost(comment: IArticleComment): IArticleComment {
    if (comment.body.includes('</q>')) {
      comment.body = comment.body.split('</q>')[1];
    }
    return comment;
  }


  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
