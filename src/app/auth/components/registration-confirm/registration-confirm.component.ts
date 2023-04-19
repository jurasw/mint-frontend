import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VerificationMethodType } from '../../models/registration.interface';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration-confirm',
  templateUrl: './registration-confirm.component.html',
  styleUrls: ['./registration-confirm.component.scss'],
})
export class RegistrationConfirmComponent implements OnInit, OnDestroy {
  public userId!: number;
  public verificationMethod!: VerificationMethodType;
  public form: FormGroup = new FormGroup({
    code: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ],
    }),
  });
  public sendCodeOnInit = false;
  public codeIsSending = false;
  public codeIsSentAgain = false;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _registrationService: RegistrationService,
    private _router: Router
  ) {
    const currentNavigation = this._router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.extras.state) {
      this.verificationMethod = currentNavigation.extras.state.verificationMethod;
      this.userId = currentNavigation?.extras.state.userId;
      this.sendCodeOnInit = currentNavigation?.extras.state.code;
    }
  }

  public ngOnInit(): void {
    if (this.sendCodeOnInit) {
      this.sendCode(false);
    }
  }

  public submit(): void {
    this._subscription = this._registrationService
      .confirmAccount(this.form.controls.code.value, this.userId)
      .subscribe(() => {
        this._router.navigate(['/home']);
      });
  }

  public sendCode(sendAgain = false): void {
    this.codeIsSending = true;
    if (this.userId) {
      this._subscription = this._registrationService
        .sendCode(this.userId)
        .subscribe(
          () => {
            this.codeIsSending = false;
            if (sendAgain) {
              this.codeIsSentAgain = true;
            }
          },
          (err) => {
            this.codeIsSending = false;
          }
        );
    }
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
