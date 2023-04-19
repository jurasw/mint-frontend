import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INameDay } from '../models/nameday.model';

const API_URL = environment.production
  ? 'https://nameday.abalin.net'
  : '/abalin';

@Injectable()
export class NameDayService {
  public headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', '*')
    .set('Access-Control-Allow-Headers', '*')
    .set('Content-Type', 'application/json');
  constructor(private _http: HttpClient) {
  }
  public getTodayNameDayList(): Observable<INameDay> {
    return this._http.post<INameDay>(
      `${API_URL}/today`,
      {
        country: 'pl',
      },
      {
        headers: this.headers,
      }
    );
  }
}
