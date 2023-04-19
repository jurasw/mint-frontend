import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IChatMessage } from 'src/app/chat/models/chat-message.interface';
import { IChatRoom } from 'src/app/chat/models/chat-room.interface';
import { ChatStoreService } from 'src/app/chat/services/chat-store.service';
import { ChatService } from 'src/app/chat/services/chat.service';
import { RoomService } from 'src/app/chat/services/room.service';
import { IUser } from 'src/app/_core/models/user.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss'],
})
export class ChatBubbleComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public room!: IChatRoom;
  @Input() public active = false;
  @Output() public messageRead$: EventEmitter<IChatRoom> = new EventEmitter();
  @Output() public messageReceived$: EventEmitter<IChatMessage> =
    new EventEmitter();
  public recipient!: IUser;
  private _subscription = new Subscription();
  constructor(
    private _roomService: RoomService,
    private _chatService: ChatService,
    private _chatStoreService: ChatStoreService,
    private _authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this._onReceiveMessage();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.room && changes.room.currentValue) {
      this.recipient = this._roomService.getRecipientFromData(this.room);
    }
  }

  private _onReceiveMessage(): void {
    this._subscription = this._chatService.receiveMessage$.subscribe(
      (message: IChatMessage) => {
        if (this.room.id === message.roomId) {
          if (this._authenticationService.currentUser &&
            message.senderId === +this._authenticationService.currentUser.id ||
            this.active
          ) {
            this.room.unseenMessagesCount = 0;
            if (this.active) {
              this.messageRead$.emit(this.room);
            }
          } else {
            this.room.unseenMessagesCount++;
          }
          this.room.latestMessage = message;
          const index = this._chatStoreService.chatRooms.findIndex(
            () => this.room
          );
          if (index !== -1) {
            this._chatStoreService.chatRooms[index - 1] = this.room;
          }
          this.messageReceived$.emit(message);
        }
      }
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
