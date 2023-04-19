import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IChatRoom } from 'src/app/chat/models/chat-room.interface';
import { RoomService } from 'src/app/chat/services/room.service';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { IMenuItem } from 'src/app/_core/models/menu-item.model';
import { IUser } from 'src/app/_core/models/user.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-chat-options',
  templateUrl: './chat-options.component.html',
  styleUrls: ['./chat-options.component.scss'],
})
export class ChatOptionsComponent implements OnInit, OnDestroy {
  @Input() public recipient!: IUser;
  @Input() public room!: IChatRoom;
  public chatOptions: IMenuItem[] = [];
  public isLoading = false;
  public isActionLoading = false;
  private _subscription = new Subscription();
  constructor(
    private _roomService: RoomService,
    private _authService: AuthenticationService,
    private _dialog: MatDialog
  ) {}

  public ngOnInit(): void {}

  public onOptionClick(item: IMenuItem): void {
    switch (this.chatOptions[this.chatOptions.indexOf(item)].action) {
      case 'blockChatUser':
        this._blockChatUser();
        break;
      case 'unblockChatUser':
        this._unblockChatUser();
        break;
    }
  }

  public onOptionsIconClick(): void {
    this.chatOptions = [];
    if (this._authService.isUserWorker) {
      this._getUnblockedRooms();
    } else {
      this._getBlocks();
    }
  }

  private _getBlocks(): void {
    this.isLoading = true;
    this._subscription = this._roomService.getAllChatBlocks().subscribe(
      (blocks: IUser[]) => {
        if (blocks.length === 0) {
          this._setPostOptions();
        } else {
          const isUserBlocked = blocks.filter(
            (block) => block.id === this.recipient.id
          )[0];
          this._setPostOptions(!!isUserBlocked);
        }
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  private _getUnblockedRooms(): void {
    this.isLoading = true;
    this._subscription = this._roomService.getAllChatBlocks().subscribe(
      (users: IUser[]) => {
        const isUserUnblocked = users.filter(
          (user: IUser) => user.id === this.recipient.id
        )[0];
        this._setPostOptions(!isUserUnblocked);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  private _setPostOptions(isUserBlocked = false): void {
    this.chatOptions = [];
    const blockChatUser = {
      label: this._authService.isUserWorker ? 'Zablokuj konwersację' : 'Zablokuj użytkownika',
      action: 'blockChatUser',
    };
    const unblockChatUser = {
      label: this._authService.isUserWorker ? 'Odblokuj konwersację' : 'Odblokuj użytkownika',
      action: 'unblockChatUser',
    };
    if (isUserBlocked) {
      this.chatOptions = [unblockChatUser];
    } else {
      this.chatOptions = [blockChatUser];
    }
  }

  private _blockChatUser(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          (this._authService.isUserWorker ? 'Czy na pewno chcesz zablokować konwersację z użytkownikiem ' : 'Czy na pewno chcesz zablokować użytkownika ') +
          this.recipient.nickName +
          '?',
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.isActionLoading = true;
        this._roomService
          .blockUserInChatRoom(this.room.id, this.recipient.id)
          .subscribe(
            () => {
              this.isActionLoading = false;
            },
            (err) => {
              this.isActionLoading = false;
            }
          );
      }
    });
  }

  private _unblockChatUser(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
        (this._authService.isUserWorker ? 'Czy na pewno chcesz odblokować konwersację z użytkownikiem ' : 'Czy na pewno chcesz odblokować użytkownika ') +
          this.recipient.nickName +
          '?',
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.isActionLoading = true;
        this._roomService
          .unblockUserInChatRoom(this.room.id, this.recipient.id)
          .subscribe(
            () => {
              this.isActionLoading = false;
            },
            (err) => {
              this.isActionLoading = false;
            }
          );
      }
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
