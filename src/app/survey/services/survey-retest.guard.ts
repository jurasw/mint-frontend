import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { SessionStorageService } from 'src/app/_core/services/sessionstorage.service';

@Injectable()
export class SurveyRetestGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _sessionStorageService: SessionStorageService,
    private _authService: AuthenticationService
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      this._sessionStorageService.getItem('isNecessaryRetest') === 'true' &&
      this._authService.currentUser
    ) {
      return true;
    }
    this._router.navigate(['/home']);
    return false;
  }
}
