import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { IMessage } from '../model/message.model';
import { environment } from 'src/environments/environment';
const API_URL = environment.API_URL;

@Injectable({providedIn: 'root'})
export class SendMessageService {

    constructor( private _http: HttpClient) {
    }
    public message: IMessage[] = [];

    public sendMessage(body: IMessage): Observable<boolean> {
        return this._http.post<boolean>(`${API_URL}/user/opinion`, body);
    }
}
