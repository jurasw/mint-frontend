import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from 'src/app/_core/models/pagination.model';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable()
export class ReportService {
  constructor(private _http: HttpClient) {}

  public report(
    forumId: number,
    threadId: number,
    postId: number,
    message: string
  ): Observable<any> {
    return this._http.post(
      `${API_URL}/forum/${forumId}/${threadId}/${postId}/report`,
      {
        message,
      }
    );
  }

  public getUserReports(
    forumId: number,
    pagination?: IPagination
  ): Observable<any> {
    return this._http.get(`${API_URL}/forum/${forumId}/user-reports`, {
      params: { ...pagination },
    });
  }

  public deleteUserReport(forumId: number, reportId: number): Observable<any> {
    return this._http.delete(
      `${API_URL}/forum/${forumId}/user-reports/${reportId}`
    );
  }
}
