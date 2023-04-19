import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { OpenviduService } from 'src/app/events/services/openvidu.service';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { environment } from 'src/environments/environment';
import {
  IRegistrationData
} from '../models/registration.interface';

const API_URL = environment.API_URL;

@Injectable()
export class RegistrationService {
  constructor(
    private _http: HttpClient,
    private _authenticationService: AuthenticationService,
    private _openviduService: OpenviduService
  ) {}

  public registerUser(data: IRegistrationData): Observable<any> {
    return this._http.post(`${API_URL}/user/managed-account`, data);
  }

  public confirmAccount(code: string, userId: number): Observable<any> {
    return this._http
      .post(
        `${API_URL}/user/managed-account/confirm/${userId}`,
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
          forkJoin([of(data), this._openviduService.getOpenviduToken()])
        ),
        tap(([userToken, openviduToken]) =>
          this._openviduService.storeOpenviduToken(openviduToken)
        )
      );
  }

  public confirmAccountByLink(token: string): Observable<any> {
    return this._http
      .post(
        `${API_URL}/user/managed-account/confirm/token`,
        {},
        {
          responseType: 'text',
          headers: { Authorization: ['Bearer ' + token] },
        }
      )
      .pipe(
        map((userToken) =>
          this._authenticationService.decodeToken(userToken.toString())
        ),
        switchMap((data) =>
          forkJoin([of(data), this._openviduService.getOpenviduToken()])
        ),
        tap(([userToken, openviduToken]) =>
          this._openviduService.storeOpenviduToken(openviduToken)
        )
      );
  }

  public sendCode(userId: number): Observable<any> {
    return this._http.put(
      `${API_URL}/user/managed-account/send-code/${userId}`,
      {}
    );
  }
}
