import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup, Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { VALIDATORS } from 'src/app/_core/constants/validations.constant';
import { matchValidator } from 'src/app/_core/functions/matchValidator.function';
import { IRegistrationData } from '../../models/registration.interface';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public loginType: 'phoneNumber' | 'mail' = 'mail';
  public emailValidators = [
    Validators.required,
    Validators.maxLength(254),
    Validators.pattern(VALIDATORS.email),
  ];
  public phoneValidators = [
    Validators.required,
    Validators.pattern(VALIDATORS.phone),
  ];
  public isSending = false;
  public form = new FormGroup({
    loginType: new FormControl('mail'),
    mail: new FormControl('', { validators: this.emailValidators }),
    phoneNumber: new FormControl('', { validators: this.phoneValidators }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
      ],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, matchValidator('password')],
    }),
    login: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern(VALIDATORS.login),
      ],
    }),
    checkAllAgreements: new FormControl(''),
    rodo: new FormControl(false, { validators: [Validators.requiredTrue] }),
    regulations: new FormControl('', { validators: [Validators.requiredTrue] }),
    marketingAgreement: new FormControl(false),
  });
  public hideFirstPassword = true;
  public hideSecondPassword = true;

  constructor(
    private _registrationService: RegistrationService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe((values) => {
      this.loginType = values.loginType;
      if (this.loginType === 'mail') {
        this.form.controls.phoneNumber.reset('', { emitEvent: false });
        this.form.controls.phoneNumber.clearValidators();
        this.form.controls.mail.setValidators(this.emailValidators);
      } else {
        this.form.controls.mail.reset('', { emitEvent: false });
        this.form.controls.mail.clearValidators();
        this.form.controls.phoneNumber.setValidators(this.phoneValidators);
      }
      this.form.controls.mail.updateValueAndValidity({ emitEvent: false });
      this.form.controls.phoneNumber.updateValueAndValidity({
        emitEvent: false,
      });
    });
  }

  public clickItem(item: string): void {
    window.open(item);
  }

  public checkAllBoxes(): void {
    const state = !this.form.controls.checkAllAgreements.value;
    this.form.controls.rodo.setValue(state);
    this.form.controls.regulations.setValue(state);
    this.form.controls.marketingAgreement.setValue(state);
  }

  public onSubmit(): void {
    this.isSending = true;
    const user: IRegistrationData = this.form.value;
    this._registrationService.registerUser(user).subscribe(
      (userId: number) => {
        this.isSending = false;
        this._router.navigate(['/auth/register/confirm-account'], {
          state: { userId, verificationMethod: this.form.controls.loginType.value === 'mail' ? 'email' : 'sms', code: false},
        });
      },
      (err) => {
        this.isSending = false;
      }
    );
  }
}
