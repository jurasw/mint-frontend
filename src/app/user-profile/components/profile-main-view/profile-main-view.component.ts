import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IChatRoom } from 'src/app/chat/models/chat-room.interface';
import { ChatStoreService } from 'src/app/chat/services/chat-store.service';
import { RoomService } from 'src/app/chat/services/room.service';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { IUser } from 'src/app/_core/models/user.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { ErrorService } from 'src/app/_core/services/error.service';
import { UserService } from 'src/app/_core/services/user.service';
import { UserProfileService } from '../../services/user-profile.service';
import { HistoryOfEventsModalComponent } from '../admin-options/history-of-events-modal/history-of-events-modal.component';
import { HistoryOfPostsModalComponent } from '../admin-options/history-of-posts-modal/history-of-posts-modal.component';
import { HistoryOfWarningsModalComponent } from '../admin-options/history-of-warnings-modal/history-of-warnings-modal.component';

@Component({
  selector: 'app-profile-main-view',
  templateUrl: './profile-main-view.component.html',
  styleUrls: ['./profile-main-view.component.scss'],
})
export class ProfileMainViewComponent implements OnInit, OnDestroy {
  @Output() public createChatConfirmed$: EventEmitter<IUser> =
    new EventEmitter();
  public user!: IUser;
  public userId!: number;
  public userRole!: string;
  public otherUserId = window.location.href;
  public userIdFromUrl = this._activatedRoute.snapshot.params['user-id'];
  public ownProfile = true;
  public isLoading = false;
  public profileImageUrl!: SafeUrl;
  public hasChatWith: boolean | undefined = undefined;
  public isSending = false;
  public isAlreadyInvited = false;
  public hasInvite = false;
  private _subscription: Subscription = new Subscription();
  private _inviteSubscription: Subscription = new Subscription();
  private _imageSubscription: Subscription = new Subscription();

  constructor(
    public router: Router,
    public authService: AuthenticationService,
    private _userProfileService: UserProfileService,
    private _userService: UserService,
    private _authenticationService: AuthenticationService,
    private _activatedRoute: ActivatedRoute,
    private _chatStoreService: ChatStoreService,
    private _dialog: MatDialog,
    private _roomService: RoomService,
    private _errorService: ErrorService
  ) {}

  public ngOnInit(): void {
    if (this._authenticationService.currentUser) {
      this.userId = this._authenticationService.currentUser.id;
      if (this.userIdFromUrl && this.userId === +this.userIdFromUrl) {
        this.router.navigate(['/user-profile/my-profile']);
      }
      this.userRole = this._authenticationService.currentUser.role;
    }

    this._getUserData();
    this._checkExistingRecipient();
  }

  public openProfileEdit(): void {
    this.router.navigate(['/user-profile/edit-profile']);
  }

  public openDialogWithHistoryOfWarnings(): void {
    this._dialog.open(HistoryOfWarningsModalComponent, {
      data: {
        userId: this.user.id,
      },
    });
  }

  public openDialogWithHistoryOfPosts(): void {
    this._dialog.open(HistoryOfPostsModalComponent, {
      data: {
        userId: this.user.id,
      },
    });
  }

  public openDialogWithHistoryOfEvents(): void {
    this._dialog.open(HistoryOfEventsModalComponent, {
      data: {
        userId: this.user.id,
      },
    });
  }

  public openChatWithRecipient(): void {
    this.isSending = true;
    if (this.hasChatWith) {
      const existingRoom = this._chatStoreService.chatRooms.filter(
        (room) => !room.isGroup &&
          room.users.filter((user) => user.id === +this.userIdFromUrl)[0]
      )[0];
      if (existingRoom) {
        this._chatStoreService.currentChatRoom = existingRoom;
        this.router.navigate(['/messages']);
        this.isSending = false;
      }
    } else {
      const dialogRef = this._dialog.open(ConfirmationModalComponent, {
        data: {
          label:
            'Czy chcesz utworzyć czat z użytkownikiem ' +
            this.user.nickName +
            '?',
          confirmButtonClass: 'btn-primary',
        },
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this._roomService
            .createChatRoom({
              name: this.user.nickName,
              users: [this.user.id],
            })
            .subscribe((room: IChatRoom) => {
              this._chatStoreService.currentChatRoom = room;
              this.router.navigate(['/messages']);
              this.isSending = false;
              this.hasChatWith = true;
            });
        }
      });
    }
  }

  public sendReqToPsychGroup(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz wysłać zaproszenie do grupy psychologicznej tej osobie?',
      },
    });
    this._subscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._subscription = this._userService
          .inviteUserToPsychoGroup(this.userIdFromUrl)
          .subscribe(
            () => {
              this.isAlreadyInvited = true;
            },
            (err) => {}
          );
      }
    });
  }

  public _getUserInvite(): void {
    this._inviteSubscription = this._userProfileService.getInvite().pipe(catchError(() => {
      this.hasInvite = false;
      this._errorService.emitError('');
      return of();
    })).subscribe(
      () => {
        this.hasInvite = true;
      }
    );
  }

  public acceptInvite(): void {
    this._inviteSubscription = this._userProfileService
      .acceptInvite()
      .subscribe(() => {
        this.hasInvite = false;
      });
  }

  public rejectInvite(): void {
    this._inviteSubscription = this._userProfileService
      .rejectInvite()
      .subscribe(() => {
        this.hasInvite = false;
      });
  }

  private _getUserData(): void {
    this.isLoading = true;
    this._subscription = this._userProfileService
      .getAllUserData(!this.userIdFromUrl ? this.userId : this.userIdFromUrl)
      .subscribe(
        (data: IUser) => {
          this.user = data;
          this.ownProfile = !this.userIdFromUrl;
          this.user.groups.forEach((group) => {
            if (group === 'Psychologiczna') {
              this.isAlreadyInvited = true;
            }
          });
          if (!this.isAlreadyInvited) {
            this._getUserInvite();
          }
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
        }
      );
  }

  private _checkExistingRecipient(): void {
    const rooms = this._chatStoreService.chatRooms;
    if (rooms.length > 0) {
      this._checkRooms(rooms);
    }
    this._chatStoreService.chatRooms$.subscribe((r: IChatRoom[]) => {
      this._checkRooms(r);
    });
  }

  private _checkRooms(rooms: IChatRoom[]): void {
    rooms.forEach((room) => {
      room.users.forEach((u) => {
        if (u.id === +this.userIdFromUrl) {
          this.hasChatWith = true;
        }
      });
    });
    if (!this.hasChatWith) {
      this.hasChatWith = false;
    }
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._inviteSubscription.unsubscribe();
    this._imageSubscription.unsubscribe();
  }
}
