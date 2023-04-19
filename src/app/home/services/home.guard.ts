import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this._authService.currentUser$.value;
    if (user) {
      this._router.navigate(['/home/welcome']);
      return true;
    }
    this._router.navigate(['/home/welcome']);
    return false;
  }
}
