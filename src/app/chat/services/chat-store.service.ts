import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IChatRoom } from '../models/chat-room.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatStoreService {
  public chatRooms$: Subject<IChatRoom[]> = new Subject();
  public currentChatRoom$: Subject<IChatRoom> = new Subject();
  public isNewChat$: Subject<boolean> = new Subject();
  private _currentChatRoom!: IChatRoom | undefined;
  private _chatRooms: IChatRoom[] = [];
  private _isNewChat = false;

  get currentChatRoom(): IChatRoom | undefined {
    return this._currentChatRoom;
  }

  set currentChatRoom(room: IChatRoom | undefined) {
    this._currentChatRoom = room;
    this.currentChatRoom$.next(room);
  }

  get chatRooms(): IChatRoom[] {
    return this._chatRooms;
  }

  set chatRooms(chatRooms: IChatRoom[]) {
    if (chatRooms) {
      this._chatRooms = chatRooms;
      this.chatRooms$.next(this._chatRooms);
    }
  }

  get isNewChat(): boolean {
    return this._isNewChat;
  }

  set isNewChat(state: boolean) {
    this._isNewChat = state;
    this.isNewChat$.next(state);
  }
  constructor() {}

  public addChatRoom(chat: IChatRoom, begin = false): void {
    if (begin) {
      this.chatRooms.unshift(chat);
    } else {
      this.chatRooms.push(chat);
    }
  }

  public reorderChatRooms(): IChatRoom[] {
    this.chatRooms.sort((a, b) => {
      if (a.latestMessage && b.latestMessage) {
        return (
          +new Date(b.latestMessage.sent) - +new Date(a.latestMessage.sent)
        );
      } else {
        return b.latestMessage ? 1 : -1;
      }
    });
    return this.chatRooms;
  }
}
