import { Component, forwardRef, Injectable, Injector, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DateRange, MatDateRangeSelectionStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { FormControlConnectorDirective } from '../../general/form-control-connector/form-control-connector';

export function calculateWeekRange<Date>(
  date: Date | null,
  dateAdapter: DateAdapter<Date>
): DateRange<Date> {
  if (date) {
    let dayOfWeek = dateAdapter.getDayOfWeek(date);
    if (dayOfWeek === 0) {
      dayOfWeek = 7;
    }
    const start = dateAdapter.addCalendarDays(date, 1 - dayOfWeek);
    const end = dateAdapter.addCalendarDays(date, 7 - dayOfWeek);
    return new DateRange<Date>(start, end);
  }
  return new DateRange<Date>(null, null);
}

@Injectable()
export class WeekSelectionStrategy<Date>
  implements MatDateRangeSelectionStrategy<Date>
{
  constructor(private _dateAdapter: DateAdapter<Date>) {}

  public selectionFinished(
    date: Date,
    currentRange: DateRange<Date>,
    event: Event
  ): DateRange<Date> {
    return this._createWeekRange(date);
  }
  public createPreview(
    activeDate: Date,
    currentRange: DateRange<Date>,
    event: Event
  ): DateRange<Date> {
    return this._createWeekRange(activeDate);
  }

  private _createWeekRange(date: Date | null): DateRange<Date> {
    return calculateWeekRange(date, this._dateAdapter);
  }
}


@Component({
  selector: 'app-weekly-date-picker',
  templateUrl: './weekly-date-picker.component.html',
  styleUrls: ['./weekly-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WeeklyDatePickerComponent),
      multi: true,
    },
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: WeekSelectionStrategy,
    },
  ],
})
export class WeeklyDatePickerComponent extends FormControlConnectorDirective implements OnInit, OnChanges {
  @Input() public name = '';
  @Input() public placeholder = 'Wybierz datę';
  @Input() public showErrors = true;
  @Input() public addMargin = true;
  @Input() public startAt = new Date();
  @Input() public hidden = false;
  @Input() public startView: 'month' | 'year' | 'multi-year' = 'month';
  @Input() public triggerCalendar!: Subject<boolean>;
  public rangeControl: FormControl = new FormControl([]);
  constructor(private _injector: Injector, private _dateAdapter: DateAdapter<Date>) {
    super(_injector);
  }

  public ngOnInit(): void {}

  public ngOnChanges(): void {
      this._setControl(this.control.value);
  }

  public onDateChange(value: any): void {
    this.control.setValue(value);
  }

  private _setControl(date: Date): void {
    const range = calculateWeekRange(date, this._dateAdapter);
    if (range && range.start && range.end) {
      this.rangeControl.setValue([new Date(range.start), new Date(range.end)]);
    }
  }
}
