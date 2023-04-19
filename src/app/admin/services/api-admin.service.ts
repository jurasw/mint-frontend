import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISpecialist } from '../models/specialist.model';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ApiAdminService {

  constructor(private _http: HttpClient) { }

  public getForums(): Observable<any> {
    return this._http.get(`${API_URL}/forum`);
  }

  public getModeratorRequests(forumId: number): Observable<any> {
    return this._http.get(`${API_URL}/forum/${forumId}/moderator-requests`);
  }

  public rejectOrAcceptModeratorRequest(forumId: number, requestId: number, answer: string): Observable<any> {
    return this._http.put(`${API_URL}/forum/${forumId}/moderator-requests/${requestId}/${answer}`, {});
  }

  public getSpecializations(): Observable<any> {
    return this._http.get(`${API_URL}/specializations`);
  }

  public registerSpecialist(specialist: ISpecialist): Observable<any> {
    return this._http.post(`${API_URL}/admin/specialist`, specialist);
  }

  public getReport(): Observable<any> {
    return this._http.get(`${API_URL}/survey/statistics`, { responseType: 'blob' });
  }

  public getNewsletterArticles(): Observable<any> {
    return this._http.get(`${API_URL}/article/postsNewsletter`);
  }

  public sendNewsletter(): Observable<any> {
    return this._http.put(`${API_URL}/article/sendNewsletter`, {});
  }

  public removeNewsletterArticle(articleId: number): Observable<any> {
    return this._http.post(`${API_URL}/article/postsNewsletter/${articleId}`, {});
  }
}
