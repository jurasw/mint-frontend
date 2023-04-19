import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from 'src/app/_core/models/pagination.model';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable()
export class ArticleService {
  constructor(private _http: HttpClient) {}

  public getAll(pagination?: IPagination): Observable<any> {
    return this._http.get(`${API_URL}/article/posts`, {params: {...pagination}});
  }

  public getThree(): Observable<any> {
    return this._http.get(`${API_URL}/article/postsLogout`);
  }

  public addArticle(body: FormData): Observable<any> {
    return this._http.post(`${API_URL}/article/posts`, body);
  }

  public getArticle(articleId: number): Observable<any> {
    return this._http.get(`${API_URL}/article/posts/${articleId}`);
  }

  public deleteArticle(articleId: number): Observable<any> {
    return this._http.delete(`${API_URL}/article/posts/${articleId}`);
  }

  public editArticle(articleId: number, body: FormData): Observable<any> {
    return this._http.put(`${API_URL}/article/posts/${articleId}`, body);
  }

  public getArticleReports(articleId: number): Observable<any> {
    return this._http.get(`${API_URL}/article/posts/${articleId}/comments/reports`);
  }

  public deleteReport(articleId: number, reportId: number): Observable<any> {
    return this._http.delete(`${API_URL}/article/posts/${articleId}/comments/reports/${reportId}`);
  }
}
