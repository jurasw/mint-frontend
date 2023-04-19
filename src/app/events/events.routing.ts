import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditEventComponent } from './components/add-edit-event/add-edit-event.component';
import { EventDetailsComponent } from './components/event/event-details/event-details.component';
import { EventResolver } from './components/event/event.resolver';
import { EventsComponent } from './components/events/events.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
  },
  {
    path: 'add-event',
    component: AddEditEventComponent
  },
  {
    path: 'edit-event/:id',
    component: AddEditEventComponent
  },
  {
    path: 'event-details/:id',
    resolve: [EventResolver],
    component: EventDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
