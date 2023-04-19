import {
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  MatDatepicker,
  MatDateRangePicker
} from '@angular/material/datepicker';
import { Subject, Subscription } from 'rxjs';
import { FormControlConnectorDirective } from '../../general/form-control-connector/form-control-connector';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent
  extends FormControlConnectorDirective
  implements OnInit, OnDestroy
{
  @ViewChild('picker') public picker!:
    | MatDatepicker<Date>
    | MatDateRangePicker<Date>;
  @Input() public name = '';
  @Input() public placeholder = 'Wybierz datę';
  @Input() public showErrors = true;
  @Input() public addMargin = true;
  @Input() public startAt = new Date();
  @Input() public hidden = false;
  @Input() public range = false;
  @Input() public startView: 'month' | 'year' | 'multi-year' = 'month';
  @Input() public triggerCalendar!: Subject<boolean>;
  @Input() public maxDate!: Date;
  @Output() public rangeDateChanged$: EventEmitter<any> = new EventEmitter();
  @Output() public monthSelected$: EventEmitter<{ date: Date, picker: MatDatepicker<Date> | MatDateRangePicker<Date>}> = new EventEmitter();
  private _triggerCalendarSubscription: Subscription = new Subscription();
  constructor(private _injector: Injector) {
    super(_injector);
  }

  public ngOnInit(): void {
    this._subscribeToCalendarIconClick();
  }

  public onRangeModelChange(model: Date, type?: 'start' | 'end'): void {
    if (this.range) {
      if (!Array.isArray(this.control.value) || type === 'start') {
        this.control.value = [];
      }
      const index = type === 'start' ? 0 : 1;
      this.control.value[index] = model;
      if (this.control.value[0] && this.control.value[1]) {
        this.rangeDateChanged$.emit(this.control.value[0]);
      }
    }
  }

  public monthSelected(date: Date): void {
    this.monthSelected$.emit({date, picker: this.picker});
  }

  private _subscribeToCalendarIconClick(): void {
    if (this.triggerCalendar) {
      this._triggerCalendarSubscription = this.triggerCalendar.subscribe(
        () => {
          this.picker?.open();
        }
      );
    }
  }

  public ngOnDestroy(): void {
    this._triggerCalendarSubscription.unsubscribe();
  }
}
