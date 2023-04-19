import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { VALIDATORS } from 'src/app/_core/constants/validations.constant';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public loginType: 'phoneNumber' | 'email' = 'email';
  public emailValidators = [
    Validators.required,
    Validators.pattern(VALIDATORS.email),
  ];
  public phoneValidators = [
    Validators.required,
    Validators.pattern(VALIDATORS.phone),
  ];
  public form = new FormGroup({
    loginType: new FormControl('email'),
    email: new FormControl('', { validators: this.emailValidators }),
    phoneNumber: new FormControl('', { validators: this.phoneValidators }),
  });

  public codeForm = new FormGroup({
    code: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ],
    }),
  });
  public userId!: number;
  public isSending = false;
  public codeIsSent = false;
  public codeIsSentAgain = false;
  constructor(
    private _loginService: LoginService,
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe((values) => {
      this.loginType = values.loginType;
      if (this.loginType === 'email') {
        this.form.controls.phoneNumber.reset('', { emitEvent: false });
        this.form.controls.phoneNumber.clearValidators();
        this.form.controls.email.setValidators(this.emailValidators);
      } else {
        this.form.controls.email.reset('', { emitEvent: false });
        this.form.controls.email.clearValidators();
        this.form.controls.phoneNumber.setValidators(this.phoneValidators);
      }
      this.form.controls.email.updateValueAndValidity({ emitEvent: false });
      this.form.controls.phoneNumber.updateValueAndValidity({
        emitEvent: false,
      });
    });
  }

  public reset(sendAgain = false): void {
    this.isSending = true;
    this._loginService
      .resetPassword({
        email: this.form.controls.email.value,
        phoneNumber: this.form.controls.phoneNumber.value,
      })
      .subscribe(
        (userId: number) => {
          this.isSending = false;
          this.codeIsSent = true;
          this.userId = userId;
          if (sendAgain) {
            this.codeIsSentAgain = true;
          }
        },
        (err) => {
          this.isSending = false;
        }
      );
  }

  public confirmCode(): void {
    this.isSending = true;
    this._loginService
      .confirmResetPassword(this.codeForm.controls.code.value, this.userId)
      .subscribe(
        (data) => {
          this.isSending = false;
          this.codeIsSent = true;
          this._router.navigate(['/auth/set-new-password'], {
            state: { data: 'set-new-password' },
          });
        },
        (err) => {
          this.isSending = false;
        }
      );
  }
}
