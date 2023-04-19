import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/forum/models/posts.interface';
import { IThread } from 'src/app/forum/models/thread.interface';
import { ForumService } from 'src/app/forum/services/forum.service';
import { ModeratorService } from 'src/app/forum/services/moderator.service';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { MAX_INT_VALUE } from 'src/app/_core/constants/pagination.constant';
import { groupBy } from 'src/app/_core/functions/groupBy.function';
import { IUser } from 'src/app/_core/models/user.interface';

@Component({
  selector: 'app-history-of-posts-modal',
  templateUrl: './history-of-posts-modal.component.html',
  styleUrls: ['./history-of-posts-modal.component.scss'],
})
export class HistoryOfPostsModalComponent implements OnInit, OnDestroy {
  public isDataLoading = false;
  public posts: IPost[] = [];
  public threads: IThread[] = [];
  public moderators!: {[key: number]: IUser};
  public listOfForums = Array<{ forumName: string; posts: [] }>();
  public userPostsGroupedByForum: { [key: number]: IPost[] } | undefined;
  private _subscription: Subscription = new Subscription();
  private _forumSubscription: Subscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HistoryOfPostsModalComponent>,
    public dialog: MatDialog,
    public moderatorService: ModeratorService,
    private _forumService: ForumService
  ) {}

  public ngOnInit(): void {
    this.getUserPosts();
    this.getForums();
  }

  public getUserPosts(): void {
    this.isDataLoading = true;
    this._subscription = this._forumService
      .search(
        {
          userId: this.data.userId,
        },
        {
          'PostPagination.Page': 1,
          'PostPagination.Limit': MAX_INT_VALUE,
          'ThreadPagination.Limit': MAX_INT_VALUE,
          'ThreadPagination.Page': 1,
        }
      )
      .subscribe((data) => {
        this.threads = data.threads.items;
        this.posts = data.posts.items;
        this.posts.forEach((res: any) => {
          if (res.body.includes('</q>')) {
            res.body = res.body.split('</q>')[1];
          }
        });
        if (this.posts.length !== 0) {
          this.userPostsGroupedByForum = groupBy(
            this.posts,
            (item) => item.forumThread.subforumId
          );
        }
        this.isDataLoading = false;
      });
  }

  public deleteMod(forumId: number, moderator: IUser): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        label: `Czy na pewno chcesz odebrać funkcję moderatora użytkownikowi ${moderator.nickName} na wybranym forum?`,
      },
    });
    this._subscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.moderatorService
          .deleteModerator(forumId, this.data.userId)
          .subscribe(() => {
            this.getForums();
          });
      }
    });
  }

  public getForums(): void {
    this.moderators = [];
    this._forumSubscription = this._forumService.getAll().subscribe((data) => {
      data.forEach((res: any) => {
        this.moderators[res.id] = res.moderators.filter((m: IUser) => m.id === this.data.userId)[0];
      });
    });
  }

  public close(state: boolean): void {
    this.dialogRef.close(state);
  }

  public closeDialog(state: boolean): void {
    this.dialogRef.close(state);
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._forumSubscription.unsubscribe();
  }
}
