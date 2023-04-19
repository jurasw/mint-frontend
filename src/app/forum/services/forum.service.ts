import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IPostPagination,
  IThreadPagination,
} from '../models/forum-pagination.interface';
import { ISearchParams } from '../models/search.interface';

const API_URL = environment.API_URL;

@Injectable()
export class ForumService {
  constructor(private _http: HttpClient) {}

  public search(
    form: ISearchParams,
    pagination?: IThreadPagination & IPostPagination
  ): Observable<any> {
    return this._http.get(`${API_URL}/forum/search`, {
      params: { ...form, ...pagination },
    });
  }

  public getAll(): Observable<any> {
    return this._http.get(`${API_URL}/forum`);
  }

  public get(forumId: number): Observable<any> {
    return this._http.get(`${API_URL}/forum/${forumId}`);
  }

  public join(forumId: number): Observable<any> {
    return this._http.put(`${API_URL}/forum/${forumId}/join`, {});
  }
}
