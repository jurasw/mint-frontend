import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { SurveyService } from 'src/app/survey/services/survey.service';
import { SessionStorageService } from '../services/sessionstorage.service';

@Injectable({
  providedIn: 'root',
})
export class IsRetestGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _sessionStorageService: SessionStorageService,
    private _surveyService: SurveyService
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this._checkRetest(state);
  }

  private _checkRetest(state: RouterStateSnapshot): boolean {
    const retest = this._sessionStorageService.getItem('isNecessaryRetest');
    if (!retest) {
      return true;
    } else if (retest === 'true') {
      this._navigateToSurveyRetest(state);
      return false;
    }
    return true;
  }

  private _navigateToSurveyRetest(state: RouterStateSnapshot): void {
    this._router.navigate(['/survey/survey-retest'], {
      queryParams: { returnUrl: state.url },
    });
  }
}
