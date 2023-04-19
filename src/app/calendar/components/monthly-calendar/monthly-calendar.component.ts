import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/events/services/event.service';
import { CalendarLogicDirective } from '../../calendar.logic';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.scss']
})
export class MonthlyCalendarComponent extends CalendarLogicDirective implements OnInit {

  constructor(
    private _calendarService: CalendarService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _eventService: EventService,
    private _dialog: MatDialog
  ) {
    super(_calendarService, _router, _activatedRoute, _eventService, _dialog);
  }
  public ngOnInit(): void {
    super.ngOnInit();
  }
}
