import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';
import { MonthlyCalendarComponent } from './components/monthly-calendar/monthly-calendar.component';
import { WeeklyCalendarComponent } from './components/weekly-calendar/weekly-calendar.component';

const routes: Routes = [
  { path: '', component: CalendarViewComponent, children: [
    { path: 'week', component: WeeklyCalendarComponent},
    { path: 'month', component: MonthlyCalendarComponent},
    { path: '**', redirectTo: 'month'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRouting {}
