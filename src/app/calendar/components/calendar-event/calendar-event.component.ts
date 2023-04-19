import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { isSameDay } from 'date-fns';
import { IEvent } from 'src/app/events/models/event.model';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss']
})
export class CalendarEventComponent implements OnInit {
  @Input() public calendarEvent!: CalendarEvent;
  @Input() public monthDay!: {date: string};
  public hideEvent = false;
  @Output() public showEventDetails$: EventEmitter<IEvent> = new EventEmitter();
  constructor() { }

  public ngOnInit(): void {
    if (this.monthDay && !isSameDay(new Date(this.monthDay.date), new Date(this.calendarEvent.meta.event.startDate))) {
      this.hideEvent = true;
    }
  }

  public showEventDetails(event: IEvent): void {
    this.showEventDetails$.emit(event);
  }

}
