import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Injectable()
export class SurveyGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._authService.currentUser && this._authService.currentUser.groups.length === 0) {
      return true;
    }
    this._router.navigate(['/home']);
    return false;
  }
}
