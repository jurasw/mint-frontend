import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { VALIDATORS } from 'src/app/_core/constants/validations.constant';
import { ConfirmChangeEmailPhoneModalComponent } from './confirm-change-email-phone-modal/confirm-change-email-phone-modal.component';

@Component({
  selector: 'app-change-email-phone',
  templateUrl: './change-email-phone.component.html',
  styleUrls: ['./change-email-phone.component.scss'],
})
export class ChangeEmailPhoneComponent implements OnInit {
  public formType = new FormControl('mail');
  public mail = new FormControl('', {
    validators: [Validators.pattern(VALIDATORS.email), Validators.required],
  });
  public phoneNumber = new FormControl('', {
    validators: [Validators.pattern(VALIDATORS.phone), Validators.required],
  });

  constructor(
    private _userProfileService: UserProfileService,
    private _dialog: MatDialog
  ) {}

  public ngOnInit(): void {}

  public onSubmit(): void {
    const isMailChange = this.formType.value === 'mail';
    const data = isMailChange ? {mail: this.mail.value } : {phoneNumber: this.phoneNumber.value};
    this._userProfileService.setOwnData(data).subscribe(() => {
      this._dialog.open(ConfirmChangeEmailPhoneModalComponent, {
        data: {
          label: isMailChange
            ? 'Wprowadź 4-cyfrowy kod, który otrzymałeś w wiadomości e-mail.'
            : 'Wprowadź 4-cyfrowy kod, który otrzymałeś na podany numer telefonu.',
          title: isMailChange ? 'Potwierdź zmianę adresu e-mail' : 'Potwierdź zmianę numeru telefonu',
          type: this.formType.value
        },
      });
    });
    this._reset();
  }

  private _reset(): void {
    this.mail.setValue('');
    this.phoneNumber.setValue('');
  }
}
