import { Directive, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { Subscription } from 'rxjs';
import { IEvent } from '../events/models/event.model';
import { EventService } from '../events/services/event.service';
import { EventDetailsModalComponent } from './components/event-details-modal/event-details-modal.component';
import { CalendarService } from './services/calendar.service';

@Directive()
export abstract class CalendarLogicDirective implements OnInit, OnDestroy {
  public viewMode!: string;
  public viewDate!: Date;
  public events: IEvent[] = [];
  public isLoading!: boolean;
  public locale = 'pl';
  public calendarEvents: CalendarEvent[] = [];
  protected subscription = new Subscription();
  protected eventSubscription = new Subscription();

  constructor(
    protected calendarService: CalendarService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected eventService: EventService,
    protected dialog: MatDialog
  ) {
    this.subscription.add(
      this.calendarService.getViewDate().subscribe((viewDate) => {
        this.viewDate = viewDate;
      })
    );
    this.subscription.add(
      this.calendarService.getViewMode().subscribe((viewMode) => {
        this.viewMode = viewMode;
        this.router.navigateByUrl('/calendar/' + viewMode);
      })
    );
    this.subscription.add(
      this.calendarService.getRefreshObservable().subscribe(() => {

      })
    );
  }

  public ngOnInit(): void {
    this._setInitialValues();
    this.getEvents();
  }

  public showEventDetails(event: IEvent): void {
    this.dialog.open(EventDetailsModalComponent, {
      data: {
        event,
      }, maxWidth: '750px'
    });
  }

  protected getEvents(): void {
    this.isLoading = true;
    this.eventSubscription = this.eventService.getEvents().subscribe((events: IEvent[]) => {
      this.events = events;
      this.calendarEvents = this._generateCalendarEvents(events);
      this.isLoading = false;
    }, err => this.isLoading = false);
  }

  private _generateCalendarEvents(events: IEvent[]): CalendarEvent[] {
    const calendarEvents: CalendarEvent[] = [];
    events.forEach(event => {
      calendarEvents.push(this.calendarService.createCalendarEvent(event));
    });
    return calendarEvents;
  }

  private _setInitialValues(): void {
    this.viewDate = this.calendarService.viewDate;
    const url = this.activatedRoute.snapshot.url[0].path;
    this.calendarService.viewMode = url;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.eventSubscription.unsubscribe();
  }
}
