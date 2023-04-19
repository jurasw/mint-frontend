import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class OpenviduSessionGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _location: Location
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentNavigation = this._router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.extras && currentNavigation.extras.state) {
      return true;
    }
    this._location.back();
    return false;
  }
}
