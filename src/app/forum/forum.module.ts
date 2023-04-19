import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../_core/_core.module';
import { ForumLayoutComponent } from './components/forum-layout/forum-layout.component';
import { MainForumComponent } from './components/main-forums/main-forum/main-forum.component';
import { MainForumsComponent } from './components/main-forums/main-forums.component';
import { ModeratorRequestModalComponent } from './components/main-forums/moderators/moderator-request-modal/moderator-request-modal.component';
import { ModeratorsComponent } from './components/main-forums/moderators/moderators.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { PostOptionsComponent } from './components/posts/post-options/post-options.component';
import { PostComponent } from './components/posts/post/post.component';
import { PostReportBadgeComponent } from './components/posts/reports/post-report-badge/post-report-badge.component';
import { PostReportListComponent } from './components/posts/reports/post-report-list/post-report-list.component';
import { UserReportModalComponent } from './components/posts/reports/user-report-modal/user-report-modal.component';
import { UserWarnModalComponent } from './components/posts/reports/user-warn-modal/user-warn-modal.component';
import { SearchForumComponent } from './components/search-forum/search-forum.component';
import { SearchResultsComponent } from './components/search-forum/search-results/search-results.component';
import { AddThreadModalComponent } from './components/threads/add-thread-modal/add-thread-modal.component';
import { ThreadComponent } from './components/threads/thread/thread.component';
import { WatchedThreadModalComponent } from './components/threads/watched-thread-modal/watched-thread-modal.component';
import { ForumRoutingModule } from './forum.routing';
import { IsQuotePostPipe } from './pipes/isQuotePostPipe/is-quote-post.pipe';
import { ForumService } from './services/forum.service';
import { ModeratorService } from './services/moderator.service';
import { PostService } from './services/post.service';
import { ReportService } from './services/report.service';
import { ThreadService } from './services/thread.service';

@NgModule({
  declarations: [
    MainForumsComponent,
    MainForumComponent,
    SearchForumComponent,
    AddThreadModalComponent,
    ThreadComponent,
    ForumLayoutComponent,
    PostComponent,
    AddPostComponent,
    PostReportListComponent,
    PostReportBadgeComponent,
    PostOptionsComponent,
    SearchResultsComponent,
    ModeratorsComponent,
    ModeratorRequestModalComponent,
    WatchedThreadModalComponent,
    IsQuotePostPipe,
    UserReportModalComponent,
    UserWarnModalComponent,
  ],
  providers: [
    ForumService,
    ThreadService,
    PostService,
    ReportService,
    ModeratorService,
  ],
  imports: [CommonModule, ForumRoutingModule, CoreModule],
})
export class ForumModule {}
