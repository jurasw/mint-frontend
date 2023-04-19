import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DEFAULT_PAGINATION } from 'src/app/_core/constants/pagination.constant';
import { IPaginationData } from 'src/app/_core/models/pagination.model';
import { IUser } from 'src/app/_core/models/user.interface';
import {
  IChatMessage,
  IChatMessageResponse,
  IChatNewMessage
} from '../../models/chat-message.interface';
import { ChatStoreService } from '../../services/chat-store.service';
import { ChatService } from '../../services/chat.service';
import { MessageService } from '../../services/message.service';
import { RoomService } from '../../services/room.service';
import { ChatLogicDirective } from '../chat-logic';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent
  extends ChatLogicDirective
  implements OnInit, OnDestroy
{
  @Input() public isBubble = false;
  @Input() public showTitle = true;
  @Input() public enableAttachments!: boolean;
  public messages: IChatMessage[] = [];
  public isMessageLoading = false;
  public moreResultsLoading = false;
  public isMoreResults = true;
  public showError = false;
  public pagination = { ...DEFAULT_PAGINATION };
  public paginationData!: IPaginationData;
  public connectionLoading = false;
  private _chatConnectionSubscription = new Subscription();
  private _chatRoomMessagesSubscription = new Subscription();
  private _subscription = new Subscription();
  constructor(
    private _chatService: ChatService,
    private _chatStoreService: ChatStoreService,
    private _roomService: RoomService,
    private _messageService: MessageService
  ) {
    super(_chatService, _chatStoreService, _roomService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    super.onReceiveCreateChatRoom();
    this._subscribeToConnectionLoading();
    this.currentChatRoomChange.subscribe(() => {
      this.pagination = { ...DEFAULT_PAGINATION };
      this.showError = false;
      this.getChatRoomMessages();
    });
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

  public getChatRoomMessages(loading = true, moreResults = false): void {
    if (loading) {
      this.isMessageLoading = true;
    }
    if (moreResults) {
      this.moreResultsLoading = true;
    } else {
      this.messages = [];
    }
    this._chatRoomMessagesSubscription.unsubscribe();
    this._chatRoomMessagesSubscription = new Subscription();
    this._chatRoomMessagesSubscription =
      this._messageService
        .getChatRoomMessages(this.currentChatRoom.id, this.pagination)
        .subscribe(
          (data: IChatMessageResponse & IPaginationData) => {
            this.isMessageLoading = false;
            if (moreResults) {
              this.messages.push(...data.items);
              this.messages = [...this.messages];
              this.isMoreResults = data.items.length > 0;
            } else {
              this.messages = data.items;
            }
            this.moreResultsLoading = false;
            this.paginationData = data;
          },
          (err) => {
            this.isMessageLoading = false;
            this.moreResultsLoading = false;
          }
        );
  }

  public onConversationScrollTop(): void {
    if (
      this.paginationData.totalPages !== this.pagination.page &&
      !this.isMessageLoading && !this.moreResultsLoading && this.isMoreResults && this.messages.length >= 10
    ) {
      this.pagination.page++;
      this.getChatRoomMessages(false, true);
    }
  }

  public sendMessage(data: IChatNewMessage): void {
    const formData = new FormData();
    formData.append('message', data.message);
    if (data.attachments) {
      for (let i = 0, j = data.attachments.length; i < j; i++) {
        formData.append('attachments', data.attachments[0]);
      }
    }
    this.subscription.add(
      this._messageService
        .sendMessage(this.currentChatRoom.id, formData)
        .subscribe(
          () => {
            this.showError = false;
            this._chatStoreService.reorderChatRooms();
          },
          (err) => {
            if (err.status === 403) {
              this.showError = true;
            }
          }
        )
    );
  }


  private _subscribeToConnectionLoading(): void {
    this.connectionLoading = true;
    this._chatConnectionSubscription =
      this._chatService.isConnectionLoading$.subscribe((state) => {
        this.connectionLoading = state;
      });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this._subscription.unsubscribe();
    this._chatRoomMessagesSubscription.unsubscribe();
    this._chatConnectionSubscription.unsubscribe();
    this._chatRoomMessagesSubscription.unsubscribe();
  }
}
