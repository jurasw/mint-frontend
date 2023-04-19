import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit, OnDestroy {
  public viewDate: Date = new Date();

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {

  }
}
