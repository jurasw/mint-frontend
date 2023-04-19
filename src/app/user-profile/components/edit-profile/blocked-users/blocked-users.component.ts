import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IChatRoomResponse } from 'src/app/chat/models/chat-room.interface';
import { RoomService } from 'src/app/chat/services/room.service';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { MAX_INT_VALUE } from 'src/app/_core/constants/pagination.constant';
import { IUser } from 'src/app/_core/models/user.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.scss'],
})
export class BlockedUsersComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public users: IUser[] = [];
  public isUserWorker = false;
  public isSending = false;
  private _subscription = new Subscription();
  private _dialogSubscription: Subscription = new Subscription();
  constructor(
    private _roomService: RoomService,
    private _dialog: MatDialog,
    private _authService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.isUserWorker = this._authService.isUserWorker;
    this._getBlocks();
  }

  private _getBlocks(): void {
    if (this.isUserWorker) {
      this._getUnblockedRooms();
    } else {
      this._getBlockedUsers();
    }
  }

  private _getUnblockedRooms(): void {
    this.users = [];
    this.isLoading = true;
    const rooms$: Observable<IChatRoomResponse> = this._roomService.getAllChatRooms({ page: 1, limit: MAX_INT_VALUE});
    const unblockedRooms$: Observable<IUser[]> =
      this._roomService.getAllChatBlocks();
    forkJoin([rooms$, unblockedRooms$]).pipe(
      map(([rooms, users]) => {
        const blockedUserRooms: IUser[] = [];
        rooms.items.filter((room) => !room.isGroup)
          .forEach((room) => {
            let hasUnblockedChat = false;
            users.forEach((user) => {
              if (room.users.filter(u => u.id === user.id)[0]) {
                hasUnblockedChat = true;
              }
            });
            if (!hasUnblockedChat) {
              const user =
              room.users.filter(
                (u) =>
                  this._authService.currentUser &&
                  u.id !== this._authService.currentUser.id
              )[0];
              if (user) {
                blockedUserRooms.push(user);
              }
            }
          });
        return blockedUserRooms;
      })
    ).subscribe((data) => {
      this.users = data;
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }

  private _getBlockedUsers(): void {
    this.isLoading = true;
    this._subscription = this._roomService.getAllChatBlocks().subscribe(
      (data: IUser[]) => {
        this.users = data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  public _unblockUser(userId: number): void {
    this.isSending = true;
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label: this.isUserWorker ? 'Czy na pewno chcesz odblokować konwersację z tym użytkownikiem?' :  'Czy na pewno chcesz odblokować tego użytkownika?',
      },
    });
    this._dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._subscription = this._roomService.unblockUser(userId).subscribe(
          () => {
            this.isSending = false;
            this._getBlocks();
          },
          (err) => {
            this.isSending = false;
          }
        );
      } else {
        this.isSending = false;
      }
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._dialogSubscription.unsubscribe();
  }
}
