import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccountConfirmedComponent } from './auth/components/account-confirmed/account-confirmed.component';
import { AccountConfirmGuard } from './auth/services/account-confirm.guard';
import { AboutProjectComponent } from './components-deprecated/availablePages/about-project/about-project.component';
import { AboutUsComponent } from './components-deprecated/availablePages/about-us/about-us.component';
import { OpinionsComponent } from './components-deprecated/availablePages/opinions/opinions.component';
import { InProgressComponent } from './_core/components/layout/in-progress/in-progress.component';
import { LayoutComponent } from './_core/components/layout/layout/layout.component';
import { PageNotFoundComponent } from './_core/components/layout/page-not-found/page-not-found.component';
import { IsRetestGuard } from './_core/guards/is-retest-guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((mod) => mod.HomeModule),
      }
    ]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'landing-page',
    loadChildren: () =>
      import('./landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'openvidu-session',
    loadChildren: () =>
      import('./openvidu/openvidu.module').then(
        (m) => m.OpenviduModule
      ),
  },
  {
    path: 'openvidu-session',
    loadChildren: () =>
      import('./openvidu/openvidu.module').then(
        (m) => m.OpenviduModule
      ),
  },
  {
    path: '',
    component: LayoutComponent, data: { loginRequired: false, sidePanel: false, headerPanel: true, infoPanel: false, registrationPanel: true},
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'verify', canActivate: [AccountConfirmGuard], component: AccountConfirmedComponent
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent, data: { loginRequired: false, sidePanel: true, infoPanel: true, headerPanel: true, registrationPanel: true },
    children: [
      {
        path: 'make-dreams',
        loadChildren: () =>
          import('./articles/articles.module').then(
            (mod) => mod.ArticlesModule
          ),
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: { loginRequired: true, sidePanel: true, infoPanel: true, headerPanel: true, registrationPanel: true},
    children: [
      {
        path: 'survey',
        loadChildren: () =>
          import('./survey/survey.module').then((m) => m.SurveyModule),
      },
      {
        path: 'forums',
        canActivate: [IsRetestGuard],
        loadChildren: () =>
          import('./forum/forum.module').then((m) => m.ForumModule),
      },
      {
        path: 'events',
        canActivate: [IsRetestGuard],
        loadChildren: () =>
          import('./events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'messages',
        canActivate: [IsRetestGuard],
        loadChildren: () =>
          import('./chat/chat.module').then((m) => m.ChatModule),
      },
      {
        path: 'calendar',
        canActivate: [IsRetestGuard],
        loadChildren: () =>
          import('./calendar/calendar.module').then(
            (mod) => mod.CalendarViewModule
          ),
      },
      {
        path: 'user-profile',
        canActivate: [IsRetestGuard],
        loadChildren: () =>
          import('./user-profile/user-profile.module').then(
            (mod) => mod.UserProfileModule
          ),
      },
      { path: 'opinions', canActivate: [IsRetestGuard], component: OpinionsComponent },
      { path: 'events', canActivate: [IsRetestGuard], component: InProgressComponent }
    ],
  },
  {
    path: '',
    component: LayoutComponent, data: { loginRequired: false, sidePanel: true, infoPanel: true, headerPanel: true, registrationPanel: true },
    children: [
      { path: 'about-us', component: AboutUsComponent },
      { path: 'about-project', component: AboutProjectComponent },
    ]
  },
  {
    path: '',
    component: LayoutComponent, data: { loginRequired: false, sidePanel: true, infoPanel: true },
    children: [
      {
        path: '404', component: PageNotFoundComponent
      },
    ]
  },
  {
    path: 'mobile',
    children: [
      { path: 'about-us', component: AboutUsComponent },
    ]
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'top'
  }), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
