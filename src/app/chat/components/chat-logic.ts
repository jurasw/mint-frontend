import {
  Directive,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/_core/models/user.interface';
import { IChatRoom } from '../models/chat-room.interface';
import { ChatStoreService } from '../services/chat-store.service';
import { ChatService } from '../services/chat.service';
import { RoomService } from '../services/room.service';

@Directive()
export class ChatLogicDirective implements OnInit, OnDestroy {
  @Output() public currentChatRoomChange: EventEmitter<void> =
    new EventEmitter();
  public isNewChat = false;
  public currentChatRoom!: IChatRoom;
  public currentRecipient!: IUser | undefined;
  public chatRooms: IChatRoom[] = [];
  protected subscription: Subscription = new Subscription();

  constructor(
    protected chatService: ChatService,
    protected chatStoreService: ChatStoreService,
    protected roomService: RoomService
  ) {}

  public ngOnInit(): void {
    this.subscribeToChatRooms();
    this.subscribeToNewChat();
    this.subscribeToCurrentChatRoom();
  }

  protected onReceiveCreateChatRoom(): void {
    this.subscription.add(
      this.chatService.receiveCreateRoom$.subscribe((data) => {
        if (data) {
          this.chatStoreService.addChatRoom(data, true);
          this.chatStoreService.isNewChat = false;
          this.chatStoreService.currentChatRoom = data;
        }
      })
    );
  }

  protected subscribeToNewChat(): void {
    this.subscription.add(
      this.chatStoreService.isNewChat$.subscribe((state: boolean) => {
        this.isNewChat = state;
      })
    );
  }

  protected subscribeToCurrentChatRoom(): void {
    this.subscription.add(
      this.chatStoreService.currentChatRoom$.subscribe((room: IChatRoom) => {
        this.currentChatRoom = room;
        this.isNewChat = !room;
        if (room) {
          this.currentRecipient = this.roomService.getRecipientFromData(
            this.currentChatRoom
          );
          this.currentChatRoomChange.emit();
        }
      })
    );
  }

  protected subscribeToChatRooms(): void {
    this.subscription.add(
      this.chatStoreService.chatRooms$.subscribe((rooms: IChatRoom[]) => {
        this.chatRooms = rooms;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
