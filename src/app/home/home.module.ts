import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../_core/_core.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MintActivitiesComponent } from './components/mint-activities/mint-activities.component';
import { UserRecommendsComponent } from './components/user-recommends/user-recommends.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { HomeRoutingModule } from './home.routing';
import { HomeGuard } from './services/home.guard';
import { QuotesService } from './services/quotes.service';



@NgModule({
  declarations: [
    MainPageComponent,
    WelcomePageComponent,
    UserRecommendsComponent,
    MintActivitiesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule
  ],
  providers: [
    QuotesService,
    HomeGuard
  ]
})
export class HomeModule { }
