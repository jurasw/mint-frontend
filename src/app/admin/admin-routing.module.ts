import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostReportListComponent } from '../forum/components/posts/reports/post-report-list/post-report-list.component';
import { LayoutComponent } from '../_core/components/layout/layout/layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ModeratorRequestsForumComponent } from './components/moderator-requests/moderator-requests-forum/moderator-requests-forum.component';
import { ModeratorRequestsComponent } from './components/moderator-requests/moderator-requests.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { PostReportComponent } from './components/post-report/post-report.component';
import { RegisteredUsersComponent } from './components/registered-users/registered-users.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MainPageComponent },
      { path: 'post-report', component: PostReportComponent },
      { path: 'post-report/:forum-id', component: PostReportListComponent },
      { path: 'moderator-requests', component: ModeratorRequestsComponent },
      { path: 'moderator-requests/:id', component: ModeratorRequestsForumComponent },
      { path: 'users', component: RegisteredUsersComponent },
      { path: 'newsletter', component: NewsletterComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
