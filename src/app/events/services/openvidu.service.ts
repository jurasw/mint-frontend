import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from 'src/app/_core/services/sessionstorage.service';
import { environment } from 'src/environments/environment';
import { IOpenviduConnectionData, IOpenviduSessionBody, IRecordingData } from '../models/openvidu-session.model';

const API_URL = environment.API_URL;
const OPENVIDU_API_URL = environment.OPENVIDU_API_URL;

@Injectable({
  providedIn: 'root'
})
export class OpenviduService {
  public token!: string;
  public onSessionClosed$: Subject<number> = new Subject();
  constructor(private _http: HttpClient, private _sessionStorageService: SessionStorageService) {}

  public getOpenviduToken(): Observable<string> {
    return this._http.get(`${API_URL}/openvidu/token`, {
      responseType: 'text'
    }).pipe(
      tap((token: string) => {
        this.token = token;
      })
    );
  }

  public storeOpenviduToken(openviduToken: string): void {
    this._sessionStorageService.setItem('openvidu-token', openviduToken);
  }

  public connectToSession(sessionId: string, body?: Partial<IOpenviduConnectionData>): Observable<any> {
    return this._http.post(`${OPENVIDU_API_URL}/sessions/${sessionId}/connection`, body);
  }

  public addSession(session: IOpenviduSessionBody): Observable<any> {
    return this._http.post(`${OPENVIDU_API_URL}/sessions`, session);
  }

  public getSession(sessionId: number): Observable<any> {
    return this._http.get(`${OPENVIDU_API_URL}/sessions/${sessionId}`);
  }

  public getSessions(): Observable<any> {
    return this._http.get(`${OPENVIDU_API_URL}/sessions`);
  }

  public deleteSession(sessionId: number | string): Observable<any> {
    return this._http.delete(`${OPENVIDU_API_URL}/sessions/${sessionId}`);
  }

  public startRecordingSession(body: IRecordingData): Observable<any> {
    return this._http.post(`${OPENVIDU_API_URL}/recordings/start`, body);
  }

  public stopRecordingSession(recordingId: string): Observable<any> {
    return this._http.post(`${OPENVIDU_API_URL}/recordings/stop/${recordingId}`, {});
  }

  public onSessionClosed(): Observable<number> {
    return this.onSessionClosed$;
  }
}
