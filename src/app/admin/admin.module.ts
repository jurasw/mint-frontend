import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PostService } from '../forum/services/post.service';
import { ReportService } from '../forum/services/report.service';
import { ThreadService } from '../forum/services/thread.service';
import { CoreModule } from '../_core/_core.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ForumListComponent } from './components/forum-list/forum-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ModeratorRequestModalComponent } from './components/moderator-requests/moderator-request-modal/moderator-request-modal.component';
import { ModeratorRequestsForumComponent } from './components/moderator-requests/moderator-requests-forum/moderator-requests-forum.component';
import { ModeratorRequestsComponent } from './components/moderator-requests/moderator-requests.component';
import { PostReportComponent } from './components/post-report/post-report.component';
import { RegisteredUsersComponent } from './components/registered-users/registered-users.component';
import { SpecialistRegistrationComponent } from './components/specialist-registration/specialist-registration.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { NewsletterModalComponent } from './components/newsletter/newsletter-modal/newsletter-modal.component';


@NgModule({
  declarations: [
    MainPageComponent,
    ModeratorRequestsComponent,
    ModeratorRequestsForumComponent,
    ModeratorRequestModalComponent,
    SpecialistRegistrationComponent,
    PostReportComponent,
    ForumListComponent,
    RegisteredUsersComponent,
    NewsletterComponent,
    NewsletterModalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatDialogModule,
    CoreModule
  ],
  providers: [
    ReportService,
    ThreadService,
    PostService
  ]
})
export class AdminModule { }
