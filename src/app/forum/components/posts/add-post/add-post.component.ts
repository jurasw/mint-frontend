import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/forum/models/posts.interface';
import { PostService } from 'src/app/forum/services/post.service';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit, OnDestroy {
  @Input() public forumId!: number;
  @Input() public threadId!: number;
  @Input() public quotePost?: IPost;
  @Output() public postAdded: EventEmitter<number> = new EventEmitter();
  @ViewChild('emoticonButton') public emoticonButtonElement!: ElementRef;
  @ViewChild('file') public file!: ElementRef;
  public showEmoticons = false;
  public addPostForm = new FormGroup({
    answer: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(2200),
    ]),
  });
  public placeholder = 'Wpisz swoją odpowiedź';
  public isSending = false;
  private _subscription = new Subscription();
  constructor(
    public authenticationService: AuthenticationService,
    private _postService: PostService
  ) {}

  public ngOnInit(): void {
    if (this.quotePost) {
      const author = this.quotePost.author.nickName;
      this.placeholder = `Odpowiedz na post użytkownika ${author} o numerze #${this.quotePost.postRef}`;
    }
  }

  public onEmojiSelect(emoji: any): void {
    this.addPostForm.controls.answer.setValue(this.addPostForm.controls.answer.value + emoji
    );
  }

  public clickOutsideEmoticons(): void {
    if (this.showEmoticons) {
      this.showEmoticons = false;
    }
  }

  public sendAnswer(): void {
    this._subscription.unsubscribe();
    this.isSending = true;
    const formData = new FormData();
    if (this.quotePost?.body.includes('</q>')) {
      this.quotePost = this._removePreviousQuoteDataFromPost(this.quotePost);
    }
    if (this.quotePost) {
      formData.append(
        'body',
        `<q>${this.quotePost.postRef},${
          this.quotePost.author.nickName
        },${this.quotePost.body.slice(0, 100)}...</q>` +
          this.addPostForm.controls.answer.value
      );
    } else {
      formData.append('body', this.addPostForm.controls.answer.value);
    }

    const files: FileList = this.file
      ? this.file.nativeElement.files
      : undefined;
    if (files) {
      for (let i = 0, j = files.length; i < j; i++) {
        formData.append('attachments', this.file.nativeElement.files[i]);
      }
    }
    this._subscription = this._postService
      .add(this.forumId, this.threadId, formData)
      .subscribe(
        (data) => {
          this.postAdded.emit(data.id);
          this.addPostForm.controls.answer.reset();
          if (this.file) {
            this.file.nativeElement.value = '';
          }
          this.isSending = false;
        },
        (err) => {
          this.isSending = false;
          window.scrollTo({top: 0});
        }
      );
  }

  private _removePreviousQuoteDataFromPost(post: IPost): IPost {
    if (post.body.includes('</q>')) {
      post.body = post.body.split('</q>')[1];
    }
    return post;
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
