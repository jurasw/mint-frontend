import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AccountConfirmGuard implements CanActivate {
  constructor(private _router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (route.queryParams.token) {
      return true;
    }
    this._router.navigate(['/auth/login']);
    return false;
  }
}
