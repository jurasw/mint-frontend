import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyGuard } from '../survey/services/survey.guard';
import { SurveyRequiredComponent } from '../_core/components/reusable/survey-required/survey-required.component';
import { ForumLayoutComponent } from './components/forum-layout/forum-layout.component';
import { MainForumComponent } from './components/main-forums/main-forum/main-forum.component';
import { MainForumsComponent } from './components/main-forums/main-forums.component';
import { PostReportListComponent } from './components/posts/reports/post-report-list/post-report-list.component';
import { ThreadComponent } from './components/threads/thread/thread.component';

const routes: Routes = [
  {
    path: ':forum-id/reported-posts',
    component: PostReportListComponent,
  },
  {
    path: '',
    component: ForumLayoutComponent,
    children: [
      {
        path: '',
        component: MainForumsComponent,
      },
      {
        path: 'survey-required',
        canActivate: [SurveyGuard],
        component: SurveyRequiredComponent
      },
      { path: ':forum-id', component: MainForumComponent },
      { path: ':forum-id/:thread-id', component: ThreadComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumRoutingModule {}
