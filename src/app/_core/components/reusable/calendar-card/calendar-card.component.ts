import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { INameDay } from '../../../models/nameday.model';
import { NameDayService } from '../../../services/nameday.service';

@Component({
  selector: 'app-calendar-card',
  templateUrl: './calendar-card.component.html',
  styleUrls: ['./calendar-card.component.scss'],
})
export class CalendarCardComponent implements OnInit, OnDestroy {
  public names: string[] = [];
  public month = '';
  public year = 0;
  public day = 0;
  public dayOfWeek = '';
  private _subscription: Subscription = new Subscription();

  constructor(private _nameDayService: NameDayService) {}

  public ngOnInit(): void {
    const date = new Date();
    const locale = 'pl';
    this.month = date.toLocaleString(locale, { month: 'long' });
    this.dayOfWeek = date.toLocaleString(locale, { weekday: 'long' });
    this.day = date.getDate();
    this.year = date.getFullYear();
  }

  private _getNameDays(): void {
    this._subscription = this._nameDayService
    .getTodayNameDayList()
    .subscribe(
      (iNameDay: INameDay) =>
        (this.names = iNameDay.data.namedays.pl.split(','))
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
