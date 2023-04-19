import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import {
  IOpenviduConnection,
  IOpenviduSession,
  IOpenviduSessionData
} from 'src/app/events/models/openvidu-session.model';
import { OpenviduService } from 'src/app/events/services/openvidu.service';
import { INotification } from 'src/app/home/models/notification.interface';
import { IChatRoom } from '../models/chat-room.interface';
import { ChatService } from '../services/chat.service';
import { RoomService } from '../services/room.service';

@Directive()
export class ChatMeetingLogicDirective implements OnInit, OnDestroy {
  @Input() public set room(room: IChatRoom) {
    this._room = room;
    this.getActiveSession();
  }
  public get room(): IChatRoom {
    return this._room;
  }
  public isMeetingStarted!: boolean;
  protected session: IOpenviduSession | undefined;
  protected _room!: IChatRoom;
  protected subscription: Subscription = new Subscription();

  constructor(
    protected chatService: ChatService,
    protected roomService: RoomService,
    protected openviduService: OpenviduService,
    protected router: Router
  ) {}

  public ngOnInit(): void {
    this.subscribeToMeetingInfo();
  }

  public addSession(): void {
    const addSession$ = this.openviduService.addSession({
      customSessionId: 'chat' + this.room.id.toString(),
    });
    const startMeeting$ = this.roomService
    .startChatMeeting(this.room.id).pipe(switchMap(() => {
        return addSession$;
    }));

    this.subscription = startMeeting$.subscribe((session) => {
      this.session = session;
      this.connectToSession();
    });
  }

  public deleteSession(): void {
    if (this.session) {
      this.subscription = this.openviduService
        .deleteSession(+this.session.id)
        .subscribe(() => {
          this.stopMeeting();
          this.session = undefined;
        });
    }
  }

  public connectToSession(): void {
    const id = 'chat' + this.room.id.toString();
    const connect$: Observable<IOpenviduConnection> =
      this.openviduService.connectToSession(id, {
        role: 'PUBLISHER',
      });
    const connection$: Observable<IOpenviduConnection[]> = forkJoin([
      connect$,
      connect$,
    ]);
    this.subscription = connection$.subscribe(([c1, c2]) => {
      this.router.navigate(['/openvidu-session/' + id], {
        state: {
          data: {
            session: this.session,
            c1,
            c2,
            isPublisher: true,
            chatRoom: this.room,
            enableRecording: false
          },
        },
      });
    });
  }

  protected stopMeeting(): void {
    this.roomService
      .stopChatMeeting(this.room.id)
      .subscribe(() => (this.isMeetingStarted = false));
  }

  protected subscribeToMeetingInfo(): void {
    this.subscription = this.chatService.receiveMeetingInfo$.subscribe(
      (notification: INotification) => {
        if (notification.redirectTo && this.room.id === notification.redirectTo.chatId) {
          if (
            notification.message.includes(
              'Rozpoczęła się wideorozmowa w kowersacji'
            )
          ) {
            this.getActiveSession();
          }

          if (
            notification.message.includes(
              'Zakończyła się wideorozmowa w konwersacji'
            )
          ) {
            this.isMeetingStarted = false;
          }
        }
      }
    );
  }

  protected getActiveSession(): void {
    this.openviduService
      .getSessions().pipe(take(1))
      .subscribe((sessions: IOpenviduSessionData) => {
        this.session = sessions.content.filter(
          (session) =>
            session.customSessionId === 'chat' + this.room.id.toString()
        )[0];
        this.isMeetingStarted = !!this.session;
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
