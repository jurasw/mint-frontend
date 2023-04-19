import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IChangePasswordData } from 'src/app/auth/models/login-credentials.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { environment } from 'src/environments/environment';
import { IUserData } from '../models/userData.model';

const API_URL = environment.API_URL;

@Injectable()
export class UserProfileService {
  constructor(private _http: HttpClient, private _authenticationService: AuthenticationService) {}

  public getAllUserData(userId: number): Observable<any> {
    return this._http.get(`${API_URL}/user/managed-account/profiles/${userId}`);
  }

  public deactivateAccount(): Observable<any> {
    return this._http.delete(`${API_URL}/user/managed-account`);
  }

  public deleteAccount(): Observable<any> {
    return this._http.delete(`${API_URL}/user/managed-account/deleteAccount`);
  }

  public changePassword(form: IChangePasswordData): Observable<any> {
    return this._http.put(
      `${API_URL}/user/managed-account/changepassword`,
      form
    );
  }

  public setOwnData(data: Partial<IUserData>): Observable<any> {
    return this._http.put(`${API_URL}/user/managed-account`, data);
  }

  public getPictures(): Observable<any> {
    return this._http.get(`${API_URL}/user/managed-account/pictures`);
  }

  public setPicture(file: FormData): Observable<any> {
    return this._http.post(`${API_URL}/user/managed-account/pictures`, file);
  }

  public setMainPicture(pictureId: number): Observable<any> {
    return this._http.put(
      `${API_URL}/user/managed-account/pictures/${pictureId}/set`,
      {}
    );
  }

  public getInvite(): Observable<any> {
    return this._http.get(`${API_URL}/user/managed-account/invite`);
  }

  public acceptInvite(): Observable<any> {
    return this._http.post(`${API_URL}/user/managed-account/accept-invite`, {},
    { responseType: 'text' }).pipe(
      map((token) =>
        this._authenticationService.decodeToken(token.toString())
      )
  );
  }

  public rejectInvite(): Observable<any> {
    return this._http.post(`${API_URL}/user/managed-account/reject-invite`, {});
  }

  public deletePicture(pictureId: number): Observable<any> {
    return this._http.delete(
      `${API_URL}/user/managed-account/pictures/${pictureId}`
    );
  }

  public confirmPhone(code: string): Observable<any> {
    return this._http.put(`${API_URL}/user/managed-account/confirm-phone/`, {
      code,
    });
  }

  public confirmEmail(code: string): Observable<any> {
    return this._http.put(`${API_URL}/user/managed-account/confirm-email/`, {
      code,
    });
  }
}
