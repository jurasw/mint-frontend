import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-settings',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent implements OnInit {
  public datePickerClick$: Subject<boolean> = new Subject<boolean>();
  public calendarTypeForm: FormGroup =  new FormGroup({
    type: new FormControl(),
    date: new FormControl(new Date())
  });

  constructor(private _calendarService: CalendarService) {}

  public ngOnInit(): void {
    this._onTypeChange();
    this._getInitialCalendarType();
  }

  public viewDateChanged(event: Date): void {
    this.calendarTypeForm.controls.date.setValue(event);
  }

  public datePickerClick(): void {
    this.datePickerClick$.next();
  }

  private _getInitialCalendarType(): void {
    this._calendarService.getViewMode().pipe(take(1)).subscribe((type: string) => {
      this.calendarTypeForm.controls.type.setValue(type);
    });
  }

  private _onTypeChange(): void {
    this.calendarTypeForm.valueChanges.subscribe((changes) => {
      if (changes.type) {
        this._calendarService.viewMode = changes.type;
      }
      if (changes.date) {
        this._calendarService.viewDate = changes.date;
      }
    });
  }
}
