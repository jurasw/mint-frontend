import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutPsychComponent } from './components/availablePages/about-psych/about-psych.component';
import { PriceListComponent } from './components/availablePages/price-list/price-list.component';
import { ContactComponent } from './components/availablePages/contact/contact.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './landing-page.component';
import { AboutUsComponent } from './components/availablePages/about-us/about-us.component';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    AboutPsychComponent,
    PriceListComponent,
    ContactComponent,
    LandingPageComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    LandingPageRoutingModule,
  ],
  providers: [],
})
export class LandingPageModule {}
