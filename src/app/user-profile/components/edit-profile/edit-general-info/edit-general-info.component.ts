import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addYears } from 'date-fns';
import { Subscription } from 'rxjs';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { IUser } from 'src/app/_core/models/user.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-edit-general-info',
  templateUrl: './edit-general-info.component.html',
  styleUrls: ['./edit-general-info.component.scss'],
})
export class EditGeneralInfoComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public user!: IUser;
  public defaultDayOfBirthday = new Date('1950, 1, 1');
  public showSuccessMessage!: boolean;
  public form = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.minLength(0), Validators.maxLength(40), Validators.required],
    }),
    middleName: new FormControl('', {
      validators: [Validators.minLength(0), Validators.maxLength(40)],
    }),
    lastName: new FormControl('', {
      validators: [Validators.minLength(0), Validators.maxLength(40), Validators.required],
    }),
    about: new FormControl('', {
      validators: [Validators.minLength(0), Validators.maxLength(1000), Validators.required],
    }),
    dateOfBirthday: new FormControl('', {
      validators: [Validators.required],
    }),
    city: new FormControl('', {
      validators: [Validators.minLength(2), Validators.maxLength(20)],
    }),
  });
  public maxDateOfBirthday!: Date;
  private _subscription: Subscription = new Subscription();

  constructor(
    private _userProfileService: UserProfileService,
    private _authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.maxDateOfBirthday = addYears(new Date(), -18);
    this._getUserData();
  }

  public onSubmit(): void {
    this._subscription = this._userProfileService
      .setOwnData(this.form.value)
      .subscribe(
        () => {
          window.scrollTo({ top: 0 });
          this.showSuccessMessage = true;
        },
        (err) => (this.showSuccessMessage = false)
      );
  }

  private _getUserData(): void {
    if (this._authenticationService.currentUser) {
      this.isLoading = true;
      this._subscription = this._userProfileService
        .getAllUserData(this._authenticationService.currentUser.id)
        .subscribe(
          (user) => {
            this.user = user;
            this._setForm();
            if (this.user.dateOfBirthday === '0001-01-01T00:00:00Z') {
              this.form.controls.dateOfBirthday.setValue(undefined);
            }
            this.isLoading = false;
          },
          (err) => {
            this.isLoading = false;
          }
        );
    }
  }

  private _setForm(): void {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setValue(this.user[key as keyof IUser]);
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
