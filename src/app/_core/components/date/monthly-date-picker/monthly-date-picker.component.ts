import { Platform } from '@angular/cdk/platform';
import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter
} from '@angular/material/core';
import { MatDatepicker, MatDateRangePicker } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { FormControlConnectorDirective } from '../../general/form-control-connector/form-control-connector';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-monthly-date-picker',
  templateUrl: './monthly-date-picker.component.html',
  styleUrls: ['./monthly-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthlyDatePickerComponent),
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: NativeDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
  ],
})
export class MonthlyDatePickerComponent
  extends FormControlConnectorDirective
  implements OnInit
{
  @Input() public name = '';
  @Input() public placeholder = 'Wybierz datę';
  @Input() public showErrors = true;
  @Input() public addMargin = true;
  @Input() public startAt = new Date();
  @Input() public hidden = false;
  @Input() public startView: 'month' | 'year' | 'multi-year' = 'month';
  @Input() public triggerCalendar!: Subject<boolean>;
  constructor(
    private _injector: Injector,
    private _dateAdapter: DateAdapter<Date>
  ) {
    super(_injector);
  }

  public ngOnInit(): void {}

  public monthSelected(event: {date: Date, picker: MatDatepicker<Date> | MatDateRangePicker<Date>}): void {
    this.onDateChange(event.date);
    event.picker.close();
  }

  public onDateChange(value: any): void {
    this.control.setValue(value);
  }
}
