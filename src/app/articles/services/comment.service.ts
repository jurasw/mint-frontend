import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from 'src/app/_core/models/pagination.model';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable()
export class CommentService {
  constructor(private _http: HttpClient) {}

  public getComments(articleId: number, pagination?: IPagination): Observable<any> {
    return this._http.get(`${API_URL}/article/posts/${articleId}/comments`, { params: {...pagination}});
  }

  public addComment(articleId: number,  body: string): Observable<any> {
    return this._http.post(`${API_URL}/article/posts/${articleId}/comments`, { body });
  }

  public getComment(articleId: number, commentId: number): Observable<any> {
    return this._http.get(`${API_URL}/article/posts/${articleId}/comments/${commentId}`);
  }

  public deleteComment(articleId: number, commentId: number): Observable<any> {
    return this._http.delete(`${API_URL}/article/posts/${articleId}/comments/${commentId}`);
  }

  public editComment(articleId: number, commentId: number, body: string ): Observable<any> {
    return this._http.put(`${API_URL}/article/posts/${articleId}/comments/${commentId}`, { body });
  }

  public reactToComment(articleId: number, commentId: number, reactionId: number | null): Observable<any> {
    return this._http.put(`${API_URL}/article/posts/${articleId}/comments/${commentId}/react`, { reactionId });
  }

  public reportComment(articleId: number, commentId: number, message: string ): Observable<any> {
    return this._http.post(`${API_URL}/article/posts/${articleId}/comments/${commentId}/report`, { message }) ;
  }
}
