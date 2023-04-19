import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { InfoModalComponent } from 'src/app/_core/components/modals/info-modal/info-modal.component';

@Component({
  selector: 'app-confirm-change-email-phone-modal',
  templateUrl: './confirm-change-email-phone-modal.component.html',
  styleUrls: ['./confirm-change-email-phone-modal.component.scss']
})
export class ConfirmChangeEmailPhoneModalComponent implements OnInit, OnDestroy {
  public code = new FormControl('', { validators: [Validators.minLength(4), Validators.maxLength(4)]});
  private _subscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { label: string, title: string, type: 'mail' | 'phoneNumber' },
    private _dialogRef: MatDialogRef<ConfirmChangeEmailPhoneModalComponent>,
    private _userProfileService: UserProfileService,
    private _dialog: MatDialog
  ) {}

  public ngOnInit(): void {}

  public confirm(): void {
    if (this.data.type === 'mail') {
      this._subscription = this._userProfileService.confirmEmail(this.code.value).subscribe(() => {
        this._closeDialog();
      });
    } else {
      this._subscription = this._userProfileService.confirmPhone(this.code.value).subscribe(() => {
        this._closeDialog();
      });
    }
  }

  private _closeDialog(): void {
    this._dialogRef.close(true);
    this._dialog.open(InfoModalComponent, {
      data: {
        label: 'Udało Ci się zmienić ' + (this.data.type === 'mail' ? 'adres e-mail' : 'numer telefonu') + '.'
      }
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
