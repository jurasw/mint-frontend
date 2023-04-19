import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { OpenviduService } from 'src/app/events/services/openvidu.service';
import { SurveyService } from 'src/app/survey/services/survey.service';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { SessionStorageService } from 'src/app/_core/services/sessionstorage.service';
import { environment } from 'src/environments/environment';
import {
  ILoginCredentials,
  IResetPasswordData
} from '../models/login-credentials.interface';

const API_URL = environment.API_URL;

@Injectable()
export class LoginService {
  constructor(
    private _http: HttpClient,
    private _authenticationService: AuthenticationService,
    private _openviduService: OpenviduService,
    private _surveyService: SurveyService,
    private _sessionStorageService: SessionStorageService
  ) {}

  public login(credencials: ILoginCredentials): Observable<any> {
    return this._http
      .post(
        `${API_URL}/user/managed-account/login`,
        {
          login: credencials.login,
          password: credencials.password,
        },
        { responseType: 'text' }
      )
      .pipe(
        map((token) =>
          this._authenticationService.decodeToken(
            token.toString(),
            credencials.rememberPassword
          )
        ),
        switchMap((data) =>
          forkJoin([of(data), this._openviduService.getOpenviduToken(), this._surveyService.isNecessaryRetest()])
        ),
        tap(([token, openviduToken, isNecessaryRetest]) => {
          this._openviduService.storeOpenviduToken(openviduToken);
          this._sessionStorageService.setItem('isNecessaryRetest', isNecessaryRetest);
        }
        )
      );
  }

  public resetPassword(form: IResetPasswordData): Observable<any> {
    return this._http.put(
      `${API_URL}/user/managed-account/resetpassword`,
      form
    );
  }

  public confirmResetPassword(code: string, userId: number): Observable<any> {
    return this._http
      .put(
      `${API_URL}/user/managed-account/confirm-reset-password/${userId}`,
      {
        code,
      },
      { responseType: 'text' }
      )
      .pipe(
        map((token) =>
          this._authenticationService.decodeToken(token.toString())
        ),
        switchMap((data) =>
          forkJoin([of(data), this._openviduService.getOpenviduToken(), this._surveyService.isNecessaryRetest()])
        ),
        tap(([userToken, openviduToken, isNecessaryRetest]) => {
          this._openviduService.storeOpenviduToken(openviduToken);
          this._sessionStorageService.setItem('isNecessaryRetest', isNecessaryRetest);
        }
        )
    );
  }

  public setNewPassword(newPassword: string): Observable<any> {
    return this._http.put(`${API_URL}/user/managed-account/set-new-password`, {
      newPassword,
    });
  }

  public changePassword(newPassword: string): Observable<any> {
    return this._http.put(`${API_URL}/user/managed-account/changepassword`, {
      newPassword,
      confirmPassword: newPassword,
    });
  }
}
