import { ChangeDetectorRef, Component, forwardRef, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IOption } from '../../../models/option.interface';
import { FormControlConnectorDirective } from '../../general/form-control-connector/form-control-connector';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimepickerComponent),
      multi: true,
    },
  ],
})
export class TimepickerComponent extends FormControlConnectorDirective implements OnInit, OnChanges {
  @Input() public beginningTime = '00:00';
  @Input() public hourSplitter: 1 | 2 | 4 =  1;
  @Input() public placeholder = 'Wybierz godzinę';
  public timeOptions: IOption[] = [];
  constructor(private _injector: Injector, private _cdr: ChangeDetectorRef) {
    super(_injector);
  }

  public ngOnInit(): void {
    this._generateTimeOptions();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.beginningTime && changes.beginningTime.currentValue) {
      this._generateTimeOptions();
      this.control.setValue(this.timeOptions[0].value);
    }
  }

  private _generateTimeOptions(): void {
    this.timeOptions = [];
    for (let i = 0; i < 24; i++) {
      const hour = (i < 10 ? '0' : '') + i;
      const fullHour = hour + ':00';
      const halfHour = hour + ':30';
      const firstQuarter = hour + ':15';
      const thirdQuarter = hour + ':45';
      this._addTimeOption(fullHour);
      switch (this.hourSplitter) {
        case 2:
          this._addTimeOption(halfHour);
          break;
        case 4:
          this._addTimeOption(firstQuarter);
          this._addTimeOption(halfHour);
          this._addTimeOption(thirdQuarter);
          break;
      }
    }
    if (this.beginningTime !== '00:00') {
      let hourIndex = -1;
      this.timeOptions.forEach((option: IOption, index) => {
        if (option.value === this.beginningTime) {
          hourIndex = index;
        }
      });
      if (hourIndex >= 0) {
        this.timeOptions = this.timeOptions.slice(hourIndex + 1);
      }
      this._addTimeOption('00:00');
    }
  }

  private _addTimeOption(time: string): void {
    this.timeOptions.push({
      displayName: time,
      value: time
    });
  }
}
