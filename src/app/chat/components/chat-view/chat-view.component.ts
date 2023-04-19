import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAX_INT_VALUE } from 'src/app/_core/constants/pagination.constant';
import { ChatStoreService } from '../../services/chat-store.service';
import { ChatService } from '../../services/chat.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent implements OnInit, OnDestroy {
  @Input() public isBubble = false;
  @Input() public showPanel = true;
  @Input() public showErrors = true;
  @Input() public showRoomTitle = true;
  @Input() public enableAttachments = true;
  public isLoading = false;
  private _subscription = new Subscription();
  private _chatConnectionSubscription = new Subscription();
  constructor(
    private _chatStoreService: ChatStoreService,
    private _chatService: ChatService,
    private _roomService: RoomService
  ) {
    this._subscribeToconnectionLoading();
  }

  public ngOnInit(): void {
    this.isLoading = this._chatService.isConnectionLoading$.getValue();
    this._getChatRooms();
  }

  private _subscribeToconnectionLoading(): void {
    this._chatService.isConnectionLoading$.subscribe((state) => {
      this.isLoading = state;
    });
  }

  private _getChatRooms(): void {
    this.isLoading = true;
    this._subscription.add(
      this._roomService.getAllChatRooms({ page: 1, limit: MAX_INT_VALUE}).subscribe(
        (data) => {
          if (!this._chatStoreService.currentChatRoom) {
            this._chatStoreService.currentChatRoom = data.items[0];
          } else {
            this._chatStoreService.currentChatRoom$.next(
              this._chatStoreService.currentChatRoom
            );
          }
          this._chatStoreService.chatRooms = data.items;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
        }
      )
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._chatConnectionSubscription.unsubscribe();
  }
}
