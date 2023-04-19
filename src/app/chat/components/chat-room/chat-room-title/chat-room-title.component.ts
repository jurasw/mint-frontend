import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IChatUserStatus } from 'src/app/chat/models/chat-user-status.interface';
import { ChatService } from 'src/app/chat/services/chat.service';
import { RoomService } from 'src/app/chat/services/room.service';
import { OpenviduService } from 'src/app/events/services/openvidu.service';
import { IUser } from 'src/app/_core/models/user.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { ChatMeetingLogicDirective } from '../../chat-meeting.logic';

@Component({
  selector: 'app-chat-room-title',
  templateUrl: './chat-room-title.component.html',
  styleUrls: ['./chat-room-title.component.scss'],
})
export class ChatRoomTitleComponent extends ChatMeetingLogicDirective implements OnInit, OnDestroy {
  @Input() public recipient!: IUser;
  private _statusSubscription = new Subscription();
  private _subscription = new Subscription();
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router,
    private _chatService: ChatService,
    private _roomService: RoomService,
    private _openviduService: OpenviduService,
    private _router: Router
  ) {
    super(_chatService, _roomService, _openviduService, _router);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this._onRecipientStatusChange();
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

  public showUserProfile(id: any): void {
    this.router.navigate(['/user-profile/' + id]);
    window.scrollTo({ top: 0 });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._statusSubscription.unsubscribe();
  }
}
