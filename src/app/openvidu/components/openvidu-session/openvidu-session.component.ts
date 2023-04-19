import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { differenceInMinutes } from 'date-fns';
import {
  OpenviduSessionComponent,
  OvSettings,
  Session
} from 'openvidu-angular';
import { forkJoin, of, Subscription } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { IChatRoom } from 'src/app/chat/models/chat-room.interface';
import { RoomService } from 'src/app/chat/services/room.service';
import { IEvent } from 'src/app/events/models/event.model';
import { EventService } from 'src/app/events/services/event.service';
import { INotification } from 'src/app/home/models/notification.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { NotificationService } from 'src/app/_core/services/notification.service';
import { ChatStoreService } from '../../../chat/services/chat-store.service';
import {
  IOpenviduConnection,
  IOpenviduSession
} from '../../../events/models/openvidu-session.model';
import { OpenviduService } from '../../../events/services/openvidu.service';

@Component({
  selector: 'app-openvidu-session',
  templateUrl: './openvidu-session.component.html',
  styleUrls: ['./openvidu-session.component.scss'],
})
export class OpenViduSessionComponent implements OnInit, OnDestroy {
  @ViewChild('ovSessionComponent', {
    read: OpenviduSessionComponent,
    static: true,
  })
  public ovSessionComponent!: OpenviduSessionComponent;
  public ovSession!: Session;
  public connection!: IOpenviduConnection;
  public session!: IOpenviduSession;
  public userNickName!: string;
  public isPublisher!: boolean;
  public tokens: string[] = [];
  public isRecording = false;
  public isRecordingLoading = false;
  public enableRecording!: boolean;
  public recordingId!: string;
  public ovSettings!: OvSettings;
  public event!: IEvent;
  public chatRoom!: IChatRoom;
  public minutesUntilEventEnds!: number;
  public checkEventMinutesInterval!: any;
  private _sessionLeft = false;
  private _recordingSubscription: Subscription = new Subscription();
  private _chatRoomsSubscription: Subscription = new Subscription();
  constructor(
    private _openviduService: OpenviduService,
    private _authService: AuthenticationService,
    private _router: Router,
    private _chatStoreService: ChatStoreService,
    private _eventService: EventService,
    private _notificationService: NotificationService,
    private _roomService: RoomService
  ) {
    this._getRouteData();
  }

  public ngOnInit(): void {
    this._setOvSettings();
    if (this.event) {
      this._subscribeToChatRooms();
      this._subscribeToNewNotifications();
      this._checkMinutesUntilEventEnds();
    }
  }

  public startRecording(): void {
    this.isRecordingLoading = true;
    this._openviduService
      .startRecordingSession({
        session: this.session.customSessionId,
        name: this.session.createdAt.toString(),
      })
      .pipe(
        tap((recordingObject) => (this.recordingId = recordingObject.id)),
        switchMap((recordingObject) =>
          this._eventService.startOpenviduRecording(
            this.event.id,
            recordingObject.id
          )
        )
      )
      .subscribe(
        () => {
          this.isRecording = true;
          this.isRecordingLoading = false;
        },
        (err) => (this.isRecordingLoading = false)
      );
  }

  public stopRecording(): void {
    this.isRecordingLoading = true;
    if (this.recordingId) {
      this._openviduService
        .stopRecordingSession(this.recordingId)
        .pipe(
          switchMap((recordingObject) =>
            this._eventService.stopOpenviduRecording(
              this.event.id,
              recordingObject.id
            )
          )
        )
        .subscribe(
          () => {
            this.recordingId = '';
            this.isRecording = false;
            this.isRecordingLoading = false;
          },
          (err) => (this.isRecordingLoading = false)
        );
    }
  }

  public handlerErrorEvent(event: any): void {
    if (event.code === 202) {
      this.sessionLeft();
    }
  }

  public handlerSessionCreatedEvent(event: Session): void {
    this.ovSession = event;
    this.ovSession.on('sessionDisconnected', () => {
      this.sessionLeft();
      this._openviduService.onSessionClosed$.next();
    });
  }

  public sessionLeft(): void {
    if (this._sessionLeft === false) {
      this._sessionLeft = true;
      this._disconnect();
      }
  }

  private _checkMinutesUntilEventEnds(): void {
    const getDifference = (endDate: Date) => {
      this.minutesUntilEventEnds = differenceInMinutes(endDate, new Date());
    };
    if (this.event && this.event.endDate) {
      const endDate = new Date(this.event.endDate);
      getDifference(endDate);
      this.checkEventMinutesInterval = setInterval(() => {
        getDifference(endDate);
        if (this.minutesUntilEventEnds < 0) {
          clearInterval(this.checkEventMinutesInterval);
          this.minutesUntilEventEnds = 0;
        }
      }, 1000 * 60);
    }
  }

  private _setOvSettings(): void {
    this.ovSettings = {
      chat: false,
      autopublish: !this.isPublisher,
      toolbar: true,
      footer: true,
      toolbarButtons: {
        audio: this.isPublisher,
        video: this.isPublisher,
        screenShare: this.isPublisher,
        fullscreen: true,
        layoutSpeaking: true,
        exit: true,
      },
    };
  }

  private _subscribeToChatRooms(): void {
    this._chatRoomsSubscription = this._chatStoreService.chatRooms$.subscribe(
      (data) => {
        const rooms = data.filter(
          (r) => r.name === this.event.title && r.isGroup === true
        );
        const room = rooms[rooms.length - 1];
        this._chatStoreService.currentChatRoom$.next(room);
      }
    );
  }

  private _getRouteData(): void {
    const currentNavigation = this._router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.extras.state) {
      const data = currentNavigation.extras.state.data;
      this.connection = data.c1;
      this.session = data.session;
      this.enableRecording = data.enableRecording;
      this.isRecording = this.session?.recording;
      this.isPublisher = data.isPublisher;
      this.event = data.event;
      this.chatRoom = data.chatRoom;
      if (this._authService.currentUser) {
        this.userNickName = this._authService.currentUser.nickName;
      }

      this.tokens = [this.connection.token];
      let secondToken;
      if (data.c2) {
        secondToken = data.c2.token;
      }
      if (secondToken) {
        this.tokens.push(secondToken);
      }
    }
  }

  private _subscribeToNewNotifications(): void {
    this._notificationService.receiveNotification$.subscribe(
      (notification: INotification) => {
        if (notification.typeNotification === 'Event') {
          if (notification.message.includes('Nagrywanie video zakończone')) {
            this.isRecording = false;
            this.recordingId = '';
          }
          if (notification.message.includes('Rozpoczęło się nagrywanie video')) {
            this.isRecording = true;
            if (notification.redirectTo)  {
              this.recordingId = notification.redirectTo.recordingId;
            }
          }
        }
      }
    );
  }

  private _disconnect(): void {
    if (this.isRecording) {
      this.stopRecording();
    }
    if (this.checkEventMinutesInterval) {
      clearInterval(this.checkEventMinutesInterval);
    }
    if (this.ovSession) {
      if (this.event && this.isPublisher) {
        const nofityStopSession$ = this._eventService.stopOpenviduSession(
          +this.session.id
        );
        const deleteSession$ = this._openviduService.deleteSession(+this.session.id);
        this._openviduService
          .getSession(+this.session.id)
          .pipe(
            take(1),
            switchMap((s: IOpenviduSession) => {
              if (s.connections && s.connections.content) {
                const publishers = s.connections.content.filter(
                  (connection) => connection.role === 'PUBLISHER'
                );
                return publishers.length > 0 ? of([]) : forkJoin([deleteSession$, nofityStopSession$]);
              }
              return of([]);
            }),
            catchError(() => (this.isPublisher ? nofityStopSession$ : of()))
          )
          .subscribe(() => {
            this._router.navigate(['/events']);
          });
      } else if (!this.isPublisher) {
        this._router.navigate(['/events']);
      } else if (this.chatRoom) {
        this._router.navigate(['/messages']);
        if (this.session) {
          const deleteSession$ = this._openviduService.deleteSession(this.session.id);
          const stopChatMeeting$ = this._roomService.stopChatMeeting(this.chatRoom.id);
          stopChatMeeting$.pipe(take(1), switchMap(() => deleteSession$)).subscribe(() => {});
        }
      }
    }
  }

  public ngOnDestroy(): void {
    if (!this._sessionLeft) {
      this._disconnect();
    }
    this._recordingSubscription.unsubscribe();
    this._chatRoomsSubscription.unsubscribe();
  }
}
