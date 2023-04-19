import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { ChatStoreService } from 'src/app/chat/services/chat-store.service';
import { IUser } from 'src/app/_core/models/user.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

interface IChatRecipient {
  user: IUser;
  hasConversation: boolean;
}

@Component({
  selector: 'app-chat-search-results',
  templateUrl: './chat-search-results.component.html',
  styleUrls: ['./chat-search-results.component.scss'],
})
export class ChatSearchResultsComponent implements OnInit, OnChanges {
  @Input() public moreResultsLoading = false;
  @Input() public chatUsers: IUser[] = [];
  public chatRecipients: IChatRecipient[] = [];
  @Output() public searchResultClicked$: EventEmitter<IUser> =
    new EventEmitter();
  @Output() public scrollBottom$: EventEmitter<void> = new EventEmitter();
  constructor(
    private _chatStoreService: ChatStoreService,
    private _authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this._setExistingRecipients();
  }

  @HostListener('window.scroll', ['$event'])
  public onScrollBottom(event: any): void {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      this.scrollBottom$.emit();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.chatUsers && changes.chatUsers.currentValue) {
      this._setExistingRecipients();
    }
  }

  public searchResultClick(recipient: IChatRecipient): void {
    if (recipient.hasConversation) {
      const existingRoom = this._chatStoreService.chatRooms.filter(
        (room) => room.users.filter((user) => user.id === recipient.user.id && !room.isGroup)[0]
      )[0];
      if (existingRoom) {
        this._chatStoreService.currentChatRoom = existingRoom;
      }
    } else {
      this.searchResultClicked$.emit(recipient.user);
    }
  }

  private _setExistingRecipients(): void {
    this.chatRecipients = [];
    this.chatUsers.forEach((user, index) => {
      if (this._authenticationService.currentUser && user.id !== this._authenticationService.currentUser.id) {
        this.chatRecipients.push({ user, hasConversation: false });
        this._chatStoreService.chatRooms.forEach((room) => {
          if (!room.isGroup) {
            room.users.forEach((u) => {
              if (u.id === user.id && this.chatRecipients[index]) {
                this.chatRecipients[index].hasConversation = true;
              }
            });
          }
        });
      }
    });
  }
}
