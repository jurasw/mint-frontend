import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs/';
import { INotification } from 'src/app/home/models/notification.interface';
import { environment } from 'src/environments/environment';
import { IPagination } from '../models/pagination.model';
import { AuthenticationService } from './authentication.service';
const API_URL = environment.API_URL;
const SERVER_URL = environment.SERVER_URL;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notificationConnected$: Subject<void> = new Subject();
  public receiveNotification$: Subject<INotification> = new Subject();
  public connection!: signalR.HubConnection;
  public isConnectionLoading$ = new BehaviorSubject(false);

  constructor(private _authService: AuthenticationService, private _http: HttpClient) {}

  public notificationConnection(): void {
    if (!this.connection) {
      this.isConnectionLoading$.next(true);
      this.notificationConnected$.subscribe(
        () => {
          this.isConnectionLoading$.next(false);
        },
        (err) => {
          this.isConnectionLoading$.next(false);
        }
      );
      this.connect();
    }
  }

  public disconnect(): void {
    if (this.connection) {
      this.connection.stop();
    }
  }

  public connect(): any {
    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${SERVER_URL}/hubs/notifications`, {
          accessTokenFactory: () => this._authService.currentUser ? this._authService.currentUser.token : '',
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.connection
        .start()
        .then(() => {
          this.notificationConnected$.next();
        })
        .catch((err: string) => console.error(err.toString()));
      this.connection.on('ReceiveNotification', (data: any) => {
        this.receiveNotification$.next(data);
      });
    }
  }

  public getAll(pagination?: IPagination): Observable<any> {
    return this._http.get(`${API_URL}/notifications/`, { params: {...pagination}});
  }

  public readAll(): Observable<any> {
    return this._http.put(`${API_URL}/notifications/read`, {});
  }

  public read(id: number): Observable<any> {
    return this._http.put(`${API_URL}/notifications/${id}/read`, {});
  }

  public delete(id: number): Observable<any> {
    return this._http.delete(`${API_URL}/notifications/${id}`);
  }
}
