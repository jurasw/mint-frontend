import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserWarnModalComponent } from 'src/app/forum/components/posts/reports/user-warn-modal/user-warn-modal.component';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { IMenuItem } from 'src/app/_core/models/menu-item.model';
import { IUser } from 'src/app/_core/models/user.interface';
import { UserService } from 'src/app/_core/services/user.service';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.scss'],
})
export class AdminOptionsComponent implements OnInit {
  @Input() public user!: IUser;
  public options: IMenuItem[] = [];
  private _subscription = new Subscription();
  private _dialogSubscription = new Subscription();

  constructor(private _dialog: MatDialog, private _userService: UserService) {}

  public ngOnInit(): void {
    this._setPostOptions();
  }

  public onOptionClick(item: IMenuItem): void {
    switch (this.options[this.options.indexOf(item)].action) {
      case 'blockUser':
        this._blockUser();
        break;
      case 'suspendUser':
        this._suspendUser();
        break;
      case 'sendWarning':
        this._sendWarning();
    }
  }

  private _setPostOptions(): void {
    const blockUser = {
      label: 'Zablokuj konto użytkownika',
      action: 'blockUser',
    };

    const suspendUser = {
      label: 'Zawieś konto użytkownika (30dni)',
      action: 'suspendUser',
    };

    const sendWarning = {
      label: 'Wyślij ostrzeżenie',
      action: 'sendWarning',
    };
    this.options.push(blockUser, suspendUser, sendWarning);
  }

  private _blockUser(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz zablokować konto użytkownika ' +
          this.user.nickName +
          ' na stałe?',
      },
    });
    this._dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._unsubscribe();
        this._subscription = this._userService
          .blockUser(this.user.id)
          .subscribe();
      }
    });
  }

  private _suspendUser(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz zawiesić konto użytkownika ' +
          this.user.nickName +
          ' na 30 dni?',
      },
    });
    this._dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._unsubscribe();
        this._subscription = this._userService
          .suspendUser(this.user.id)
          .subscribe();
      }
    });
  }

  private _sendWarning(): void {
    this._unsubscribe();
    this._dialog.open(UserWarnModalComponent, {
      data: {
        label: 'Wyślij ostrzeżenie użytkownikowi ' + this.user.nickName,
        userId: this.user.id,
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
