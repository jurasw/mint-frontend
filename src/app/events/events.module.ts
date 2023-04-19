import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserProfileService } from '../user-profile/services/user-profile.service';
import { CoreModule } from '../_core/_core.module';
import { AddEditEventComponent } from './components/add-edit-event/add-edit-event.component';
import { OrganizerResultsComponent } from './components/add-edit-event/organizer-results/organizer-results.component';
import { OrganizersComponent } from './components/add-edit-event/organizers/organizers.component';
import { EventActionsComponent } from './components/event/event-actions/event-actions.component';
import { EventDetailsComponent } from './components/event/event-details/event-details.component';
import { EventOptionsComponent } from './components/event/event-options/event-options.component';
import { EventComponent } from './components/event/event.component';
import { EventResolver } from './components/event/event.resolver';
import { EventsComponent } from './components/events/events.component';
import { EventsRoutingModule } from './events.routing';

@NgModule({
  declarations: [
    EventsComponent,
    EventComponent,
    AddEditEventComponent,
    OrganizersComponent,
    OrganizerResultsComponent,
    EventOptionsComponent,
    EventDetailsComponent,
    EventActionsComponent,
  ],
  imports: [
    CommonModule, EventsRoutingModule, CoreModule
  ],
  providers: [DatePipe, UserProfileService, EventResolver],
  exports: [
    EventDetailsComponent
  ]
})
export class EventsModule {

}
