import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPagination } from '../models/pagination.model';

const API_URL = environment.API_URL;

@Injectable()
export class UserService {
  constructor(private _http: HttpClient) {}

  public getAllUsers(pagination?: IPagination): Observable<any> {
    return this._http.get(`${API_URL}/user/managed-account/get-all-users`, { params: { ... pagination }});
  }

  public blockUser(userId: number): Observable<any> {
    return this._http.delete(`${API_URL}/admin/user/${userId}`);
  }

  public suspendUser(userId: number): Observable<any> {
    return this._http.put(`${API_URL}/admin/user/${userId}/mute`, {});
  }

  public warnUser(userId: number, message: string): Observable<any> {
    return this._http.post(`${API_URL}/admin/user/${userId}/warn`, { message });
  }

  public getUserWarning(userId: number): Observable<any> {
    return this._http.get(`${API_URL}/admin/user/${userId}/warn`);
  }

  public inviteUserToPsychoGroup(userId: number): Observable<any> {
    return this._http.post(`${API_URL}/admin/user/${userId}/invite`, {});
  }

  public reportUser(
    userId: number,
    subforumId: number,
    message: string
  ): Observable<any> {
    return this._http.post(
      `${API_URL}/admin/user/${userId}/${subforumId}/report`,
      {
        message,
      }
    );
  }
}
