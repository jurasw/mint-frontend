import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { IForum } from '../../../models/forum.interface';
import { IThread } from '../../../models/thread.interface';
import { PostService } from '../../../services/post.service';
import { ThreadService } from '../../../services/thread.service';

@Component({
  selector: 'app-add-thread-modal',
  templateUrl: './add-thread-modal.component.html',
  styleUrls: ['./add-thread-modal.component.scss'],
})
export class AddThreadModalComponent implements OnInit, OnDestroy {
  @ViewChild('file') public file!: ElementRef;
  public addThread = new FormGroup({
    title: new FormControl('', {
      validators: [
        Validators.maxLength(64),
        Validators.required,
        Validators.minLength(3),
      ],
    }),
    description: new FormControl('', {
      validators: [
        Validators.maxLength(2200),
        Validators.required,
        Validators.minLength(3),
      ],
    }),
  });
  public forums$ = new Observable<IForum[]>();
  public forum!: IForum;
  public isSending = false;
  private _id!: number;
  private _subscription = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<AddThreadModalComponent>,
    public authenticationService: AuthenticationService,
    private _router: Router,
    private _threadService: ThreadService,
    private _postService: PostService
  ) { }

  public ngOnInit(): void { }

  public createThread(): void {
    this.isSending = true;
    const threadFormData = new FormData();
    const postFormData = new FormData();
    threadFormData.append('title', this.addThread.controls.title.value);
    threadFormData.append('description', 'null');
    postFormData.append('body', this.addThread.controls.description.value);
    const files: FileList = this.file ? this.file.nativeElement.files : undefined;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        postFormData.append('attachments', this.file.nativeElement.files[i]);
      }
    }
    this._id = +this._router.url.split('/')[2];
    this._subscription = this._threadService
      .set(this._id, threadFormData)
      .pipe(
        mergeMap((data: IThread) =>
          this._postService.add(data.subforumId, data.id, postFormData)
        )
      )
      .subscribe(
        (data) => {
          this.close(true);
          this.isSending = false;
        },
        (err) => {
          this.isSending = false;
        }
      );
  }

  public close(state: boolean): void {
    this.dialogRef.close(state);
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
