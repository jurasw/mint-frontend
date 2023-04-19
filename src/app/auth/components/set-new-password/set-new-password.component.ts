import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/_core/functions/matchValidator.function';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss'],
})
export class SetNewPasswordComponent implements OnInit {
  public isSending = false;
  public isPasswordChanged = false;
  public hidePasswords: [boolean, boolean] = [true, true];
  public form = new FormGroup({
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
  });
  constructor(private _loginService: LoginService) {}

  public ngOnInit(): void {}

  public setNewPassword(): void {
    this.isSending = true;
    this.isPasswordChanged = false;
    this._loginService
      .setNewPassword(this.form.controls.password.value)
      .subscribe(
        () => {
          this.isSending = false;
          this.isPasswordChanged = true;
        },
        (err) => {
          this.isSending = false;
        }
      );
  }
}
