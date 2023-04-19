import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../_core/components/layout/layout/layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { HomeGuard } from './services/home.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [HomeGuard],
    component: LayoutComponent, data: { loginRequired: true, sidePanel: false },
    children: [{ path: '', component: MainPageComponent }],
  },
  {
    path: '',
    component: LayoutComponent, data: { loginRequired: false, sidePanel: false, addContentPadding: false },
    children: [{ path: 'welcome', component: WelcomePageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
