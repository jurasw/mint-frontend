import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from 'src/app/_core/models/pagination.model';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable()
export class MessageService {
  constructor(private _http: HttpClient) {}

  public getChatRoomMessages(
    roomId: number,
    pagination?: IPagination
  ): Observable<any> {
    return this._http.get(`${API_URL}/chat/messages/${roomId}`, {
      params: { ...pagination },
    });
  }

  public sendMessage(roomId: number, data: FormData): Observable<any> {
    return this._http.post(`${API_URL}/chat/messages/${roomId}`, data);
  }

  public readAllMessages(): Observable<any> {
    return this._http.put(`${API_URL}/chat/messages/read`, {});
  }

  public readChatRoomMessages(roomId: number): Observable<any> {
    return this._http.put(`${API_URL}/chat/messages/${roomId}/read`, {});
  }

  public readMessage(roomId: number, messageId: number): Observable<any> {
    return this._http.put(
      `${API_URL}/chat/messages/${roomId}/${messageId}/read`,
      {}
    );
  }

  public deleteMessage(roomId: number, messageId: number): Observable<any> {
    return this._http.delete(
      `${API_URL}/chat/messages/${roomId}/${messageId}`,
      {}
    );
  }

  public reactToMessage(
    roomId: number,
    messageId: number,
    reactionId: number | null
  ): Observable<any> {
    return this._http.put(
      `${API_URL}/chat/messages/${roomId}/${messageId}/react`,
      { reactionId }
    );
  }
}
