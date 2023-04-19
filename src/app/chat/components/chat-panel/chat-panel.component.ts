import { Input } from '@angular/core';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/_core/models/user.interface';
import { IChatMessage } from '../../models/chat-message.interface';
import { IChatRoom } from '../../models/chat-room.interface';
import { ChatStoreService } from '../../services/chat-store.service';
import { ChatService } from '../../services/chat.service';
import { MessageService } from '../../services/message.service';
import { RoomService } from '../../services/room.service';
import { ChatLogicDirective } from '../chat-logic';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss'],
})
export class ChatPanelComponent
  extends ChatLogicDirective
  implements OnInit, OnDestroy
{
  @Input() public isBubble = false;
  @ViewChild('chatPanels') public chatPanelsElement!: ElementRef;
  public chatPanels!: QueryList<ElementRef>;
  @Output() public roomClicked$: EventEmitter<IChatRoom> = new EventEmitter();
  private _subscription = new Subscription();

  constructor(
    private _chatStoreService: ChatStoreService,
    private _chatService: ChatService,
    private _roomService: RoomService,
    private _messageService: MessageService
  ) {
    super(_chatService, _chatStoreService, _roomService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public onRoomClick(room: IChatRoom): void {
    this._chatStoreService.isNewChat = false;
    this._chatStoreService.currentChatRoom = room;
  }

  public onMessageReceive(message: IChatMessage): void {
    this._chatStoreService.reorderChatRooms();
    this.chatPanelsElement.nativeElement.scrollTop = 0;
  }

  public createNewChat(): void {
    this._chatStoreService.currentChatRoom = undefined;
    if (!this.isNewChat) {
      this._chatStoreService.isNewChat = true;
    }
  }

  public closeNewChat(): void {
    this._chatStoreService.isNewChat = false;
    this._chatStoreService.currentChatRoom = this.chatRooms[0];
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public onCreateChatRoomConfirm(user: IUser): void {
    this._subscription.add(
      this._roomService
        .createChatRoom({
          name: user.nickName,
          users: [user.id],
        })
        .subscribe()
    );
  }
}
