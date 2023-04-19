import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class SetNewPasswordGuard implements CanActivate {
  constructor(private _router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentNavigation = this._router.getCurrentNavigation();
    if (
      currentNavigation &&
      currentNavigation.extras &&
      currentNavigation.extras.state
    ) {
      return currentNavigation.extras.state.data === 'set-new-password';
    }
    this._router.navigate(['/auth/login']);
    return false;
  }
}
