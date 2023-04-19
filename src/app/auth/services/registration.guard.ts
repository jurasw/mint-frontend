import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class RegistrationGuard implements CanActivate {
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
      return !!currentNavigation.extras.state.verificationMethod;
    }
    this._router.navigate(['/auth/register/form']);
    return false;
  }
}
