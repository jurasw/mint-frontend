import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPsychComponent } from './components/availablePages/about-psych/about-psych.component';
import { AboutUsComponent } from './components/availablePages/about-us/about-us.component';
import { ContactComponent } from './components/availablePages/contact/contact.component';
import { PriceListComponent } from './components/availablePages/price-list/price-list.component';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: 'main-page',
        component: HomeComponent,
      },
      {
        path: 'aboutPsych',
        component: AboutPsychComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'priceList',
        component: PriceListComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
