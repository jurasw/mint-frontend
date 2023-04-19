import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable()
export class ModeratorService {
  constructor(private _http: HttpClient) {}

  public becomeModerator(
    forumId: number,
    message: string,
    userId?: number
  ): Observable<any> {
    return this._http.post(`${API_URL}/forum/${forumId}/moderators`, {
      userId,
      message,
    });
  }

  public deleteModerator(
    forumId: number,
    moderatorId: number
  ): Observable<any> {
    return this._http.delete(
      `${API_URL}/forum/${forumId}/moderators/${moderatorId}`
    );
  }
}
