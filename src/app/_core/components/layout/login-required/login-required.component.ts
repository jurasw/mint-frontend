import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login-required',
  templateUrl: './login-required.component.html',
  styleUrls: ['./login-required.component.scss']
})
export class LoginRequiredComponent implements OnInit {
  private _state!: RouterStateSnapshot;
  constructor(private _router: Router) { }

  ngOnInit(): void {}

  public login(): void {
    this._state = this._router.routerState.snapshot;
    this._router.navigate(['/auth/login'], {
      queryParams: { returnUrl: this._state.url },
    });
  }

}
