import { CommonModule, formatDate } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CalendarDateFormatter,
  CalendarModule,
  DateAdapter,
  DateFormatterParams
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventsModule } from '../events/events.module';
import { CoreModule } from '../_core/_core.module';
import { CalendarRouting } from './calendar.routing';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';
import { EventDetailsModalComponent } from './components/event-details-modal/event-details-modal.component';
import { MonthlyCalendarComponent } from './components/monthly-calendar/monthly-calendar.component';
import { WeeklyCalendarComponent } from './components/weekly-calendar/weekly-calendar.component';
import { CalendarService } from './services/calendar.service';
import { CalendarEventComponent } from './components/calendar-event/calendar-event.component';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale ? locale : 'pl');
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale ? locale : 'pl');
  }

  public dayViewTitle({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEEE, d MMMM', locale ? locale : 'pl');
  }
}

@NgModule({
  declarations: [
    CalendarViewComponent,
    WeeklyCalendarComponent,
    MonthlyCalendarComponent,
    CalendarHeaderComponent,
    EventDetailsModalComponent,
    CalendarEventComponent,
  ],
  providers: [
    CalendarService,
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter },
  ],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CalendarRouting,
    CoreModule,
    EventsModule
  ],
  bootstrap: [CalendarViewComponent],
})
export class CalendarViewModule {}
