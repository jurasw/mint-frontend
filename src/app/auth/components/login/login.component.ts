import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OpenviduService } from 'src/app/events/services/openvidu.service';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { SessionStorageService } from 'src/app/_core/services/sessionstorage.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public form = new FormGroup({
    login: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    rememberPassword: new FormControl(!!this._authService.currentUser),
  });
  public isSending = false;
  public hidePassword = true;
  private _subscription = new Subscription();

  constructor(
    private _loginService: LoginService,
    private _authService: AuthenticationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _openviduService: OpenviduService,
    private _sessionStorageService: SessionStorageService
  ) {
    if (this._authService.currentUserValue) {
      this._router.navigate(['/']);
    }
  }

  public ngOnInit(): void {}

  public onSubmit(): void {
    this.isSending = true;
    this._subscription = this._loginService
      .login(this.form.value)
      .subscribe(
        (userData) => {
          const route = this._route.snapshot.queryParams.returnUrl || '/';
          this._router.navigateByUrl(route);
          this.isSending = false;
        },
        (err) => {
          this.isSending = false;
        }
      );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
