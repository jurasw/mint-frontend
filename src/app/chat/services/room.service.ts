import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from 'src/app/_core/models/pagination.model';
import { IUser } from 'src/app/_core/models/user.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { environment } from 'src/environments/environment';
import { IChatRoom, ICreateChatData } from '../models/chat-room.interface';

const API_URL = environment.API_URL;

@Injectable()
export class RoomService {
  constructor(
    private _http: HttpClient,
    private _authenticationService: AuthenticationService
  ) {}

  public getAllChatRooms(pagination?: IPagination): Observable<any> {
    return this._http.get(`${API_URL}/chat/messages`, {
      params: { ...pagination },
    });
  }

  public createChatRoom(data: ICreateChatData): Observable<any> {
    return this._http.post(`${API_URL}/chat/messages`, data);
  }

  public leaveChatRoom(roomId: number): Observable<any> {
    return this._http.put(`${API_URL}/chat/messages/${roomId}/leave`, {});
  }

  public inviteToChatRoom(roomId: number, userId: number): Observable<any> {
    return this._http.put(`${API_URL}/chat/messages/${roomId}/invite`, {
      userId,
    });
  }

  public kickFromChatRoom(roomId: number, userId: number): Observable<any> {
    return this._http.put(`${API_URL}/chat/messages/${roomId}/kick`, {
      userId,
    });
  }

  public getAllChatBlocks(): Observable<any> {
    return this._http.get(`${API_URL}/chat/blocks`);
  }

  public getRoomBlocks(roomId: number): Observable<any> {
    return this._http.get(`${API_URL}/chat/messages/${roomId}/blocks`);
  }

  public unblockUser(userId: number): Observable<any> {
    return this._http.post(`${API_URL}/chat/blocks/${userId}/unblock`, {});
  }

  public blockUserInChatRoom(roomId: number, userId: number): Observable<any> {
    return this._http.post(
      `${API_URL}/chat/messages/${roomId}/blocks/${userId}/block`,
      {}
    );
  }

  public unblockUserInChatRoom(
    roomId: number,
    userId: number
  ): Observable<any> {
    return this._http.post(
      `${API_URL}/chat/messages/${roomId}/blocks/${userId}/unblock`,
      {}
    );
  }

  public searchUsers(query: string, pagination?: IPagination): Observable<any> {
    return this._http.get(`${API_URL}/chat/search`, {
      params: {
        query,
        ...pagination,
      },
    });
  }

  public getUnblockedUsers(): Observable<any> {
    return this._http.get(`${API_URL}/chat/admin-chats`);
  }

  public startChatMeeting(roomId: number): Observable<any> {
    return this._http.get(`${API_URL}/chat/start-chat-meeting/${roomId}`);
  }

  public stopChatMeeting(roomId: number): Observable<any> {
    return this._http.get(`${API_URL}/chat/stop-chat-meeting/${roomId}`, {
      headers: {
        Authorization:
          'Bearer ' + this._authenticationService.currentUser?.token,
      },
    });
  }

  public getRecipientFromData(room: IChatRoom): IUser {
    return room.users.filter(
      (user) =>
        this._authenticationService.currentUser &&
        user.id !== +this._authenticationService.currentUser.id
    )[0];
  }
}
