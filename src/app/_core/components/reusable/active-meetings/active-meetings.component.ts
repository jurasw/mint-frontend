import { Component, OnDestroy, OnInit } from '@angular/core';
import { GuardsCheckEnd, NavigationEnd, Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { IEvent } from 'src/app/events/models/event.model';
import {
  IOpenviduConnection,
  IOpenviduSession
} from 'src/app/events/models/openvidu-session.model';
import { EventService } from 'src/app/events/services/event.service';
import { OpenviduService } from 'src/app/events/services/openvidu.service';
import { INotification } from 'src/app/home/models/notification.interface';
import { AuthenticationService } from '../../../services/authentication.service';
import { NotificationService } from '../../../services/notification.service';

interface IActiveMeeting {
  event: IEvent;
  session: IOpenviduSession;
  role: 'SUBSCRIBER' | 'PUBLISHER';
}

@Component({
  selector: 'app-active-meetings',
  templateUrl: './active-meetings.component.html',
  styleUrls: ['./active-meetings.component.scss'],
})
export class ActiveMeetingsComponent implements OnInit, OnDestroy {
  public activeMeetings: IActiveMeeting[] = [];
  public isMinimalized = false;
  public showActiveMeetings = true;
  private _subscription: Subscription = new Subscription();
  private _notificationsSubscription: Subscription = new Subscription();
  private _routerSubscription: Subscription = new Subscription();
  constructor(
    private _eventService: EventService,
    private _notificationService: NotificationService,
    private _openviduService: OpenviduService,
    private _router: Router,
    private _authService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this._subscribeToNewNotifications();
    this._subscribeToRoute();
  }

  public connectToSession(meeting: IActiveMeeting): void {
    const connect$: Observable<IOpenviduConnection> = this._openviduService.connectToSession(
      meeting.event.id.toString(),
      { role: meeting.role }
    );
    const connections$: Observable<IOpenviduConnection[]> =
      meeting.role === 'PUBLISHER'
        ? forkJoin([connect$, connect$])
        : forkJoin([connect$]);
    this._subscription = connections$.subscribe(([c1, c2]) => {
      this._router.navigate(['/openvidu-session/' + meeting.event.id], {
        state: {
          data: {
            session: meeting.session,
            c1,
            c2,
            ownEvent: meeting.role === 'PUBLISHER',
            event: meeting.event,
          },
        },
      });
    });
  }

  private _subscribeToNewNotifications(): void {
    this._notificationsSubscription =
      this._notificationService.receiveNotification$.subscribe(
        (notification: INotification) => {
          if (notification.typeNotification === 'Event') {
            if (notification.message.includes('Rozpoczęło się spotkanie video')) {
              const eventId = notification && notification.redirectTo ? notification.redirectTo.eventId : undefined;
              if (eventId) {
                const getEvent$: Observable<IEvent> =
                  this._eventService.getEvent(eventId);
                const getSession$: Observable<IOpenviduSession> =
                  this._openviduService.getSession(eventId);
                this._subscription = forkJoin([
                  getEvent$,
                  getSession$,
                ]).subscribe(([event, session]) => {
                  if (event && session && this._authService.currentUser) {
                    const role = event.suborganizers.filter(
                      (o) => this._authService.currentUser && o.id === this._authService.currentUser.id
                    )[0] || event.organizerId === this._authService.currentUser.id
                      ? 'PUBLISHER'
                      : 'SUBSCRIBER';
                    this.activeMeetings.push({
                      event,
                      session,
                      role,
                    });

                    const audio = new Audio('assets/sounds/active-meeting.wav');
                    audio.volume = 0.5;
                    audio.play();
                  }
                });
              }
            }
            if (
              notification.message.includes('Zakończyło się spotkanie video')
            ) {
              this.activeMeetings = this.activeMeetings.filter(
                (m) => notification.redirectTo && m.event.id !== notification.redirectTo.eventId
              );
            }
          }
        }
      );
  }

  private _subscribeToRoute(): void {
    this._routerSubscription = this._router.events.subscribe((res) => {
      if (res instanceof NavigationEnd || res instanceof GuardsCheckEnd) {
        this.showActiveMeetings = !(
          res.url.includes('landing-page') ||
          res.url.includes('openvidu-session')
        );
      }
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._notificationsSubscription.unsubscribe();
    this._routerSubscription.unsubscribe();
  }
}
