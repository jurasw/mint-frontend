import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IChatMessage } from 'src/app/chat/models/chat-message.interface';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { IMenuItem } from 'src/app/_core/models/menu-item.model';
import { IUser } from 'src/app/_core/models/user.interface';
import { RoomService } from '../../../../services/room.service';

@Component({
  selector: 'app-chat-message-options',
  templateUrl: './chat-message-options.component.html',
  styleUrls: ['./chat-message-options.component.scss'],
})
export class ChatMessageOptionsComponent implements OnInit, OnDestroy {
  @Input() public message!: IChatMessage;
  public options: IMenuItem[] = [];
  public isLoading = false;
  public isActionLoading = false;
  private _subscription = new Subscription();
  private _dialogSubscription = new Subscription();
  constructor(private _dialog: MatDialog, private _roomService: RoomService) {}

  public ngOnInit(): void {
    this._setPostOptions();
  }

  public onOptionClick(item: IMenuItem): void {
    switch (this.options[this.options.indexOf(item)].action) {
      case 'blockUser':
        this._blockUser();
        break;
      case 'unblockUser':
        this._unblockUser();
        break;
    }
  }

  public onOptionsIconClick(): void {
    this.options = [];
    this._getBlocks();
  }

  private _getBlocks(): void {
    this.isLoading = true;
    this._subscription = this._roomService.getRoomBlocks(this.message.roomId).subscribe(
      (blocks: IUser[]) => {
        if (blocks.length === 0) {
          this._setPostOptions();
        } else {
          const isUserBlocked = blocks.filter(
            (block) => block.id === this.message.senderId
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

  private _setPostOptions(isUserBlocked = false): void {
    this.options = [];
    const blockUser = {
      label: 'Zablokuj użytkownika w konwersacji',
      action: 'blockUser',
    };
    const unblockUser = {
      label: 'Odblokuj użytkownika w konwersacji',
      action: 'unblockUser',
    };
    if (isUserBlocked) {
      this.options = [unblockUser];
    } else {
      this.options = [blockUser];
    }
  }

  private _blockUser(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz zablokować użytkownika ' +
          this.message.sender.nickName +
          '  w tej konwersacji ?',
      },
    });
    this._dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._subscription = this._roomService
          .blockUserInChatRoom(this.message.roomId, this.message.senderId)
          .subscribe(() => this.isActionLoading = false, err => this.isActionLoading = false);
      }
    });
  }

  private _unblockUser(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz odblokować użytkownika ' +
          this.message.sender.nickName +
          '  w tej konwersacji ?',
      },
    });
    this._dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._subscription = this._roomService
          .unblockUserInChatRoom(this.message.roomId, this.message.senderId)
          .subscribe(() => this.isActionLoading = false, err => this.isActionLoading = false);
      }
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._dialogSubscription.unsubscribe();
  }
}
