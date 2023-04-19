import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IChatMessage } from 'src/app/chat/models/chat-message.interface';
import { IChatRoom } from 'src/app/chat/models/chat-room.interface';
import { ChatService } from 'src/app/chat/services/chat.service';
import { MessageService } from 'src/app/chat/services/message.service';
import { RoomService } from 'src/app/chat/services/room.service';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss'],
})
export class ChatConversationComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input() public room!: IChatRoom;
  @Input() public messages: IChatMessage[] = [];
  @Input() public moreResultsLoading = false;
  @ViewChild('conversation') public conversationElement!: ElementRef;
  @Output() public scrollTop$: EventEmitter<void> = new EventEmitter();
  private _subscription = new Subscription();
  constructor(
    public authenticationService: AuthenticationService,
    private _chatService: ChatService,
    private _roomService: RoomService,
    private _messageService: MessageService,
    private _cdr: ChangeDetectorRef
  ) {}

  @HostListener('window.scroll', ['$event'])
  public onScrollTop(event: any): void {
    if (
      event.target.scrollTop === 0 &&
      event.target.offsetHeight < event.target.scrollHeight
    ) {
      this.scrollTop$.emit();
      event.target.scrollTop = 1;
    }
  }

  public ngOnInit(): void {
    this._onReceiveMessage();
  }

  public ngAfterViewInit(): void {
    this.scrollConversationToBottom();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.messages &&
      changes.messages.currentValue?.length > 0 &&
      changes.messages.previousValue?.length === 0
    ) {
      this.scrollConversationToBottom();
    }
  }

  public _onReceiveMessage(): void {
    this._subscription.add(
      this._chatService.receiveMessage$.subscribe((message: IChatMessage) => {
        if (message.roomId === this.room.id) {
          this.messages.unshift(message);
          this.messages = [...this.messages];
          this.scrollConversationToBottom();
        }

        if (this.authenticationService.currentUser &&  +this.authenticationService.currentUser.id !== message.senderId) {
          const audio = new Audio('../assets/sounds/chat-message.wav');
          audio.volume = 0.5;
          audio.play();
        }
      })
    );
  }

  public scrollConversationToBottom(): void {
    this._cdr.detectChanges();
    this.conversationElement.nativeElement.scrollTop =
      this.conversationElement.nativeElement.scrollHeight;
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
