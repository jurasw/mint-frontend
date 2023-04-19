import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/forum/models/posts.interface';
import { IReport } from 'src/app/forum/models/report.interface';
import { PostService } from 'src/app/forum/services/post.service';
import { ReportService } from 'src/app/forum/services/report.service';
import { ThreadService } from 'src/app/forum/services/thread.service';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { IMenuItem } from 'src/app/_core/models/menu-item.model';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { UserService } from 'src/app/_core/services/user.service';
import { UserReportModalComponent } from '../reports/user-report-modal/user-report-modal.component';
import { UserWarnModalComponent } from '../reports/user-warn-modal/user-warn-modal.component';

@Component({
  selector: 'app-post-options',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.scss'],
})
export class PostOptionsComponent implements OnInit, OnDestroy {
  @Input() public post!: IPost;
  @Input() public report!: IReport;
  @Input() public forumId!: number;
  @Input() public isFirstPost = false;
  @Input() public isThreadView = false;
  @Input() public deleteReportOption = false;
  @Output() public refresh$: EventEmitter<boolean> = new EventEmitter();
  public options: IMenuItem[] = [];
  private _subscription = new Subscription();
  private _dialogSubscription = new Subscription();
  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _threadService: ThreadService,
    private _postService: PostService,
    private _reportService: ReportService,
    private _authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this._setPostOptions();
  }

  public onOptionClick(item: IMenuItem): void {
    switch (this.options[this.options.indexOf(item)].action) {
      case 'deleteThread':
        this._deleteThread();
        break;
      case 'deletePost':
        this._deletePost();
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
      case 'sendWarning':
        this._sendWarning();
        break;
      case 'reportUser':
        this._reportUser();
    }
  }

  private _setPostOptions(): void {
    const deletePost = this.isFirstPost
      ? {
          label: 'Usuń wątek',
          action: 'deleteThread',
        }
      : {
          label: 'Usuń komentarz',
          action: 'deletePost',
        };
    const deleteReport = {
      label: 'Usuń zgłoszenie',
      action: 'deleteReport',
    };

    const suspendUser = {
      label: 'Zawieś konto użytkownika (30dni)',
      action: 'suspendUser',
    };

    const blockUser = {
      label: 'Zablokuj konto użytkownika',
      action: 'blockUser',
    };

    const sendWarning = {
      label: 'Wyślij ostrzeżenie',
      action: 'sendWarning',
    };

    const reportUserAsModerator = {
      label: 'Zgłoś użytkownika do administratora',
      action: 'reportUser',
    };
    this.options = [deletePost];
    if (this.report) {
      this.options.push(deleteReport);
    }
    if (this._authenticationService.currentUser && +this._authenticationService.currentUser.id !== this.post.authorId) {
      this.options.push(sendWarning);
    }
    if (this._authenticationService.isUserAdmin) {
      this.options.push(blockUser, suspendUser);
    } else {
      this.options.push(reportUserAsModerator);
    }
  }

  private _deleteThread(): void {
    this._unsubscribe();
    this._subscription = this._threadService
      .delete(this.forumId, this.post.forumThreadId)
      .subscribe(() => {
        this.isThreadView
          ? this._router.navigate(['../'], { relativeTo: this._activatedRoute })
          : this.refresh$.next();
      });
  }

  private _deletePost(): void {
    this._unsubscribe();
    this._subscription = this._postService
      .delete(this.forumId, this.post.forumThreadId, this.post.id)
      .subscribe(() => {
        this.refresh$.next();
      });
  }

  private _deleteReport(): void {
    this._unsubscribe();
    this._subscription = this._reportService
      .deleteUserReport(this.forumId, this.report.id)
      .subscribe(() => {
        this.refresh$.next();
      });
  }

  private _suspendUser(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz zawiesić konto użytkownika ' +
          this.post.author.nickName +
          ' na 30 dni?',
      },
    });
    this._dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._unsubscribe();
        this._subscription = this._userService
          .suspendUser(this.post.author.id)
          .subscribe();
      }
    });
  }
  private _blockUser(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz zablokować konto użytkownika ' +
          this.post.author.nickName +
          ' na stałe?',
      },
    });
    this._dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._unsubscribe();
        this._subscription = this._userService
          .blockUser(this.post.author.id)
          .subscribe();
      }
    });
  }

  private _reportUser(): void {
    this._unsubscribe();
    this._dialog.open(UserReportModalComponent, {
      data: {
        label: 'Zgłoś użytkownika ' + this.post.author.nickName,
        userId: this.post.authorId,
        forumId: this.post.forumThread.subforumId,
      },
    });
  }

  private _sendWarning(): void {
    this._unsubscribe();
    this._dialog.open(UserWarnModalComponent, {
      data: {
        label: 'Wyślij ostrzeżenie użytkownikowi ' + this.post.author.nickName,
        userId: this.post.authorId,
      },
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
