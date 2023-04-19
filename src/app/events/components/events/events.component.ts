import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DEFAULT_PAGINATION } from 'src/app/_core/constants/pagination.constant';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { IEvent } from '../../models/event.model';
import {
  IOpenviduSession,
  IOpenviduSessionData
} from '../../models/openvidu-session.model';
import { EventService } from '../../services/event.service';
import { OpenviduService } from '../../services/openvidu.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
  public eventsWithSessions$!: Observable<IEvent[]>;
  public fromDate: string = new Date(
    new Date().setHours(0, 0, 0, 0)
  ).toUTCString();
  public isLoading = false;
  public showAddEventButton = false;
  public pagination = { ...DEFAULT_PAGINATION };
  public sessions: IOpenviduSession[] = [];
  public _sessionSubscription: Subscription = new Subscription();
  private _events$!: Observable<IEvent[]>;
  constructor(
    private _openviduService: OpenviduService,
    private _eventService: EventService,
    private _authService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.showAddEventButton = this._authService.isUserWorker;
    this._getEvents();
    this._getSessions();
  }

  public onEventDelete(eventId: number): void {
    this.eventsWithSessions$ = this.eventsWithSessions$.pipe(
      map((events) => events.filter((e) => e.id !== eventId))
    );
  }

  public onPageChange(pageNumber: number): void {
    this.pagination.page = pageNumber;
    window.scrollTo({top: 0});
  }

  private _getSessions(): void {
    this._sessionSubscription.unsubscribe();
    this._sessionSubscription = new Subscription();
    this._sessionSubscription = this._openviduService
      .getSessions()
      .subscribe((sessions: IOpenviduSessionData) => {
        this.sessions = sessions.content;
        this._addExistingSessionsToEvents();
      });
  }

  private _getEvents(): void {
    this.isLoading = true;
    this._events$ = this._eventService.getEvents(this.fromDate).pipe(
      tap(() => {
        this.isLoading = false;
      })
    );
  }

  private _addExistingSessionsToEvents(): void {
    this.eventsWithSessions$ = this._events$.pipe(
      map((events: IEvent[]) => {
        events.forEach((event: IEvent) => {
          if (this.sessions.length === 0) {
            event.isSession = false;
          } else {
            this.sessions.forEach((session: IOpenviduSession) => {
              if (+session.customSessionId === event.id) {
                event.session = session;
              }
              event.isSession = !!event.session;
            });
          }
        });
        return events;
      })
    );
  }

  public ngOnDestroy(): void {
    this._sessionSubscription.unsubscribe();
  }
}
