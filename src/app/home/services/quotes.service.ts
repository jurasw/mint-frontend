import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable()
export class QuotesService {
  constructor(private _http: HttpClient) {}

  public get(): Observable<any> {
    return this._http.get(`${API_URL}/quote/`);
  }
}
