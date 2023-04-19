import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IChatMessage } from 'src/app/chat/models/chat-message.interface';
import { IChatRoom } from 'src/app/chat/models/chat-room.interface';
import { ChatStoreService } from 'src/app/chat/services/chat-store.service';
import { ChatService } from 'src/app/chat/services/chat.service';
import { MessageService } from 'src/app/chat/services/message.service';
import { RoomService } from 'src/app/chat/services/room.service';
import { IUser } from 'src/app/_core/models/user.interface';
import { SessionStorageService } from 'src/app/_core/services/sessionstorage.service';

@Component({
  selector: 'app-chat-bubbles-view',
  templateUrl: './chat-bubbles-view.component.html',
  styleUrls: ['./chat-bubbles-view.component.scss'],
})
export class ChatBubblesViewComponent implements OnInit, OnDestroy {
  @ViewChild('chatBubbles') public chatBubblesElement!: ElementRef;
  public showBubbles = false;
  public showChatWindow = false;
  public chatRooms: IChatRoom[] = [];
  public isChatMinimalized = false;
  public currentRecipient!: IUser;
  public currentChatRoom!: IChatRoom;
  public actionState = [false, false];
  public allUnseenMessages = 0;
  private _subscription = new Subscription();
  constructor(
    private _chatService: ChatService,
    private _chatStoreService: ChatStoreService,
    private _roomService: RoomService,
    private _messageService: MessageService,
    private _sessionStorageService: SessionStorageService,
    private _cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this._subscribeToChatRooms();
    this._subscribeToCurrentChatRoom();
    this.showBubbles = JSON.parse(
      this._sessionStorageService.getItem('showBubbles')
    );
  }

  @HostListener('window.scroll', ['$event'])
  public onChatBubblesScroll(event: any): void {
    const ev = event.target;
    if (ev) {
      this._setActionStates(ev);
    }
  }

  public scrollBubbles(state: boolean): void {
    this.chatBubblesElement.nativeElement.scrollBy({
      top: state ? -100 : 100,
      behavior: 'smooth',
    });
    this._cdr.detectChanges();
  }

  public chatIconClicked(): void {
    this.showBubbles = !this.showBubbles;
    this._sessionStorageService.setItem('showBubbles', this.showBubbles);
  }

  public clickBubble(room: IChatRoom): void {
    this._chatStoreService.currentChatRoom = room;
    this.isChatMinimalized = false;
    this.showChatWindow = true;
    if (room.unseenMessagesCount > 0) {
      this.allUnseenMessages -= room.unseenMessagesCount;
      room.unseenMessagesCount = 0;
      this._readAllRoomMessages(room);
    }
  }

  public onMessageRead(room: IChatRoom): void {
    this._readAllRoomMessages(room);
  }

  public onMessageReceived(message: IChatMessage): void {
    this._calculateUnseenMessages();
    this._chatStoreService.reorderChatRooms();
    this.chatBubblesElement.nativeElement.scrollTop = 0;
  }

  public closeChatWindow(): void {
    this.showChatWindow = false;
    this._chatStoreService.currentChatRoom = undefined;
  }

  private _calculateUnseenMessages(): void {
    this.allUnseenMessages = 0;
    for (let i = 0, j = this.chatRooms.length; i < j; i++) {
      this.allUnseenMessages += this.chatRooms[i].unseenMessagesCount;
    }
  }

  private _readAllRoomMessages(room: IChatRoom): void {
    this._subscription.add(
      this._messageService.readChatRoomMessages(room.id).subscribe()
    );
  }

  private _subscribeToCurrentChatRoom(): void {
    this._subscription.add(
      this._chatStoreService.currentChatRoom$.subscribe((room: IChatRoom) => {
        if (room) {
          this.currentRecipient = this._roomService.getRecipientFromData(room);
        }
        this.currentChatRoom = room;
      })
    );
  }

  private _subscribeToChatRooms(): void {
    this._subscription.add(
      this._chatStoreService.chatRooms$.subscribe((rooms: IChatRoom[]) => {
        this.chatRooms = rooms.filter((room) => room.users.length > 1);
        this._calculateUnseenMessages();
        if (this.chatRooms.length > 0) {
          this.showChatWindow = true;
        }
        this._cdr.detectChanges();
        if (this.chatBubblesElement) {
          this._setActionStates(this.chatBubblesElement.nativeElement);
        }
      })
    );
  }

  private _setActionStates(element: any): void {
    if (element.scrollHeight === element.offsetHeight) {
      this.actionState = [false, false];
    } else if (
      element.scrollTop === 0 &&
      element.offsetHeight < element.scrollHeight
    ) {
      this.actionState = [false, true];
    } else if (
      element.offsetHeight + element.scrollTop >=
      element.scrollHeight
    ) {
      this.actionState = [true, false];
    } else {
      this.actionState = [true, true];
    }
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
