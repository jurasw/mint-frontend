import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IChangePasswordData } from 'src/app/auth/models/login-credentials.interface';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { InfoModalComponent } from 'src/app/_core/components/modals/info-modal/info-modal.component';
import { matchValidator } from 'src/app/_core/functions/matchValidator.function';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  public isSending = false;
  public form = new FormGroup({
    currentPassword: new FormControl('', {
      validators: [Validators.required],
    }),
    newPassword: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, matchValidator('newPassword')],
    }),
  });
  public hidePasswords: [boolean, boolean, boolean] = [true, true, true];
  private _dialogSubscription: Subscription = new Subscription();
  constructor(
    public authService: AuthenticationService,
    private _userProfileService: UserProfileService,
    private _dialog: MatDialog
  ) {}

  public ngOnInit(): void {}

  public onSubmit(): void {
    this.isSending = true;
    const form: IChangePasswordData = this.form.value;

    this._dialogSubscription = this._userProfileService
      .changePassword(form)
      .subscribe(
        (data) => {
          this.isSending = false;
          const dialogRef = this._dialog.open(InfoModalComponent, {
            data: {
              label: 'Twoje hasło zostało zmienione.',
            },
          });
          this._dialogSubscription = dialogRef.afterClosed().subscribe(() => {
            window.location.reload();
          });
        },
        (err) => {
          this.isSending = false;
        }
      );
  }

  public ngOnDestroy(): void {
    this._dialogSubscription.unsubscribe();
  }
}
