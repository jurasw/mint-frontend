import { Injectable } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { Observable, Subject } from 'rxjs';
import { IEvent } from 'src/app/events/models/event.model';
import { EventService } from 'src/app/events/services/event.service';

@Injectable()
export class CalendarService {
  private _refresh$: Subject<any> = new Subject();
  private _viewDate: Date = new Date();
  private _viewMode = 'month';
  private _viewModeChange$: Subject<string> = new Subject<string>();
  private _viewDateChange$: Subject<Date> = new Subject<Date>();

  constructor(private _eventService: EventService) {}

  public get viewDate(): Date {
    return this._viewDate;
  }

  public set viewDate(date: Date) {
    this._viewDate = date;
    this._viewDateChange$.next(this._viewDate);
  }

  public get viewMode(): string {
    return this._viewMode;
  }

  public set viewMode(mode: string) {
    this._viewMode = mode;
    this._viewModeChange$.next(this._viewMode);
  }

  public refresh(): void {
    this._refresh$.next();
  }

  public getViewMode(): Observable<string> {
    return this._viewModeChange$.asObservable();
  }

  public getViewDate(): Observable<Date> {
    return this._viewDateChange$.asObservable();
  }

  public getRefreshObservable(): Observable<any> {
    return this._refresh$.asObservable();
  }

  public createCalendarEvent(event: IEvent): CalendarEvent {
    const calendarEvent = {
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      title: event.title,
      color: {
        primary: 'fff',
        secondary: 'fff'
      },
      meta: {
        event,
        isPastEvent: this._eventService.isPastEvent(event),
        isEventActive: this._eventService.isEventActive(event)
      },
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
    };
    return calendarEvent;
  }
}
