import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { INotification } from 'src/app/home/models/notification.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { ErrorService } from 'src/app/_core/services/error.service';
import { environment } from 'src/environments/environment';
import { IChatMessage } from '../models/chat-message.interface';
import { IChatRoom } from '../models/chat-room.interface';
import { IChatUserStatus } from '../models/chat-user-status.interface';
const SERVER_URL = environment.SERVER_URL;
const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public chatConnected$: Subject<void> = new Subject();
  public receiveMessage$: Subject<IChatMessage> = new Subject();
  public receiveRemoveMessage$: Subject<void> = new Subject();
  public receiveLeaveRoom$: Subject<void> = new Subject();
  public receiveJoinRoom$: Subject<void> = new Subject();
  public receiveCreateRoom$: Subject<IChatRoom> = new Subject();
  public receiveUserStatus$: Subject<IChatUserStatus> = new Subject();
  public receiveMessageRead$: Subject<void> = new Subject();
  public receiveMeetingInfo$: Subject<INotification> = new Subject();
  public connection!: signalR.HubConnection;
  public isConnectionLoading$ = new BehaviorSubject(false);
  constructor(
    private _authService: AuthenticationService,
    private _http: HttpClient,
    private _errorService: ErrorService
  ) {}

  public chatConnection(): void {
    if (!this.connection) {
      this.isConnectionLoading$.next(true);
      this.chatConnected$.subscribe(
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
        .withUrl(`${SERVER_URL}/hubs/chat`, {
          accessTokenFactory: () => this._authService.currentUser ? this._authService.currentUser.token : '',
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.connection
        .start()
        .then(() => {
          this.chatConnected$.next();
        })
        .catch((err: string) => console.error(err.toString()));
      this.connection.onclose = () => {
        this._errorService.emitError(
          'Utracono połączenie. Odśwież stronę, aby połączyć się z czatem.'
        );
      };
      this.connection.on('ReceiveMessage', (data: any) => {
        this.receiveMessage$.next(data);
      });
      this.connection.on('ReceiveRemoveMessage', (data: any) => {
        this.receiveRemoveMessage$.next(data);
      });
      this.connection.on('ReceiveLeaveRoom', (data: any) => {
        this.receiveLeaveRoom$.next(data);
      });
      this.connection.on('ReceiveJoinRoom', (data: any) => {
        this.receiveJoinRoom$.next(data);
      });
      this.connection.on('ReceiveCreateRoom', (data: any) => {
        this.receiveCreateRoom$.next(data);
      });
      this.connection.on('ReceiveUserStatus', (data: any) => {
        this.receiveUserStatus$.next(data);
      });
      this.connection.on('ReceiveMessageRead', (data: any) => {
        this.receiveMessageRead$.next(data);
      });
      this.connection.on('ReceiveMeetingInfo', (data: INotification) => {
        this.receiveMeetingInfo$.next(data);
      });
    }
  }

  public setStatus(status: 0 | 1): Observable<any> {
    return this._http.put(`${API_URL}/chat/status`, {}, { params: { status } });
  }
}
