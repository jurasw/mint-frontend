import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from 'src/app/_core/models/pagination.model';
import { environment } from 'src/environments/environment';
import { ReactionId } from '../../_core/models/reaction.interface';
import { IPostData } from '../models/posts.interface';

const API_URL = environment.API_URL;

@Injectable()
export class PostService {
  constructor(private _http: HttpClient) {}

  public getPosts(
    forumId: number,
    threadId: number,
    pagination?: IPagination
  ): Observable<any> {
    return this._http.get(`${API_URL}/forum/${forumId}/${threadId}/posts`, {
      params: { ...pagination },
    });
  }

  public get(
    forumId: number,
    threadId: number,
    postId: number
  ): Observable<any> {
    return this._http.get(`${API_URL}/forum/${forumId}/${threadId}/${postId}`);
  }

  public modify(
    forumId: number,
    threadId: number,
    postId: number,
    form: IPostData
  ): Observable<any> {
    return this._http.put(
      `${API_URL}/forum/${forumId}/${threadId}/${postId}`,
      form
    );
  }

  public delete(
    forumId: number,
    threadId: number,
    postId: number
  ): Observable<any> {
    return this._http.delete(
      `${API_URL}/forum/${forumId}/${threadId}/${postId}`
    );
  }

  public add(
    forumId: number,
    threadId: number,
    form: FormData
  ): Observable<any> {
    return this._http.post(`${API_URL}/forum/${forumId}/${threadId}`, form);
  }

  public react(
    forumId: number,
    threadId: number,
    postId: number,
    reactionId: ReactionId | null
  ): Observable<any> {
    return this._http.put(
      `${API_URL}/forum/${forumId}/${threadId}/${postId}/react`,
      {
        ReactionId: reactionId,
      }
    );
  }
}
