import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IChatMessage, IChatRecipient } from 'src/app/chat/models/chat-message.interface';
import { IChatRoom } from 'src/app/chat/models/chat-room.interface';
import { IChatUserStatus } from 'src/app/chat/models/chat-user-status.interface';
import { ChatService } from 'src/app/chat/services/chat.service';
import { MessageService } from 'src/app/chat/services/message.service';
import { RoomService } from 'src/app/chat/services/room.service';
import { IUser } from 'src/app/_core/models/user.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-chat-panel-item',
  templateUrl: './chat-panel-item.component.html',
  styleUrls: ['./chat-panel-item.component.scss'],
})
export class ChatPanelItemComponent implements OnInit, OnDestroy {
  @Input() public active = false;
  @Input() public room!: IChatRoom;
  @Input() public message!: IChatRecipient;
  @Output() public roomClicked$: EventEmitter<IChatRoom> = new EventEmitter();
  @Output() public messageReceived$: EventEmitter<IChatMessage> =
    new EventEmitter();
  @Input() public recipient!: IUser;
  private _subscription = new Subscription();
  private _statusSubscription = new Subscription();

  constructor(
    public authenticationService: AuthenticationService,
    private _chatService: ChatService,
    private _roomService: RoomService,
    private _messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.recipient = this._roomService.getRecipientFromData(this.room);
    this._onRecipientStatusChange();
    this._onReceiveMessage();
  }

  public roomClick(): void {
    this.room.unseenMessagesCount = 0;
    this._readAllRoomMessages(this.room);
    if (!this.active) {
      this.roomClicked$.next(this.room);
    }
  }

  private _readAllRoomMessages(room: IChatRoom): void {
    this._subscription.add(
      this._messageService.readChatRoomMessages(room.id).subscribe()
    );
  }

  private _onRecipientStatusChange(): void {
    this._statusSubscription = this._chatService.receiveUserStatus$.subscribe(
      (status: IChatUserStatus) => {
        if (this.recipient && this.recipient.id === status.userId) {
          this.recipient.status = status;
        }
      }
    );
  }

  private _onReceiveMessage(): void {
    this._subscription.add(
      this._chatService.receiveMessage$.subscribe((message: IChatMessage) => {
        if (this.room.id === message.roomId) {
          if (this.authenticationService.currentUser &&
            message.senderId === +this.authenticationService.currentUser.id ||
            this.active
          ) {
            this.room.unseenMessagesCount = 0;
            if (this.active) {
              this._readAllRoomMessages(this.room);
            }
          } else {
            this.room.unseenMessagesCount++;
          }
          this.room.latestMessage = message;
          this.messageReceived$.emit(message);
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._statusSubscription.unsubscribe();
  }
}
