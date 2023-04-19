import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  IThread,
  IThreadResponse,
} from 'src/app/forum/models/thread.interface';
import { ThreadService } from 'src/app/forum/services/thread.service';
import { MAX_INT_VALUE } from 'src/app/_core/constants/pagination.constant';

@Component({
  selector: 'app-watched-thread-modal',
  templateUrl: './watched-thread-modal.component.html',
  styleUrls: ['./watched-thread-modal.component.scss'],
})
export class WatchedThreadModalComponent implements OnInit {
  public isThreadLoading = false;
  public threads: IThread[] = [];
  private _threadSubscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<WatchedThreadModalComponent>,
    public dialog: MatDialog,
    private _threadService: ThreadService
  ) {
    this._getThreads();
  }

  public ngOnInit(): void {}

  public close(state: boolean): void {
    this.dialogRef.close(state);
  }

  private _getThreads(): void {
    this._threadSubscription.unsubscribe();
    this._threadSubscription = new Subscription();
    this.isThreadLoading = true;
    this.threads = [];
    const getThreads$: Observable<IThreadResponse> = this._threadService.getAll(
      this.data.forumId,
      {
        page: 1,
        limit: MAX_INT_VALUE,
      }
    );
    this._threadSubscription = getThreads$
      .pipe(
        map((data) => {
          data.items = data.items.filter((item) => item.isSubscribed);
          return data;
        })
      )
      .subscribe(
        (data) => {
          this.threads = data.items;
          this.isThreadLoading = false;
        },
        (err) => {
          this.isThreadLoading = false;
        }
      );
  }

  public closeDialog(state: boolean): void {
    this.dialogRef.close(state);
  }

  public ngOnDestroy(): void {
    this._threadSubscription.unsubscribe();
  }
}
