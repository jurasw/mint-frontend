import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from 'src/app/_core/models/pagination.model';
import { environment } from 'src/environments/environment';
import { IThreadData } from '../models/thread.interface';

const API_URL = environment.API_URL;

@Injectable()
export class ThreadService {
  constructor(private _http: HttpClient) {}

  public getAll(forumId: number, pagination?: IPagination): Observable<any> {
    return this._http.get(`${API_URL}/forum/${forumId}/threads`, {
      params: { ...pagination },
    });
  }

  public get(forumId: number, threadId: number): Observable<any> {
    return this._http.get(`${API_URL}/forum/${forumId}/${threadId}`);
  }

  public read(threadId: number): Observable<void> {
    return this._http.put<void>(`${API_URL}/forum/${threadId}/read`, {});
  }

  public modify(
    forumId: number,
    threadId: number,
    form: IThreadData
  ): Observable<any> {
    return this._http.put(`${API_URL}/forum/${forumId}/${threadId}`, form);
  }

  public delete(forumId: number, threadId: number): Observable<any> {
    return this._http.delete(`${API_URL}/forum/${forumId}/${threadId}`);
  }

  public set(id: number, form: FormData): Observable<any> {
    return this._http.post(`${API_URL}/forum/${id}`, form);
  }

  public subThread(forumId: number, threadId: number): Observable<any> {
    return this._http.put(
      `${API_URL}/forum/${forumId}/${threadId}/subscribe`,
      {}
    );
  }

  public unsubThread(forumId: number, threadId: number): Observable<any> {
    return this._http.put(
      `${API_URL}/forum/${forumId}/${threadId}/unsubscribe`,
      {}
    );
  }
}
