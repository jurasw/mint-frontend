import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { OpenviduSessionModule } from 'openvidu-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { ChatBubblesModule } from './chat-bubbles/chat-bubbles.module';
import { AboutProjectComponent } from './components-deprecated/availablePages/about-project/about-project.component';
import { AboutPsychComponent } from './components-deprecated/availablePages/about-psych/about-psych.component';
import { AboutUsComponent } from './components-deprecated/availablePages/about-us/about-us.component';
import { ContactComponent } from './components-deprecated/availablePages/contact/contact.component';
import { LandingPageComponent } from './components-deprecated/availablePages/landing-page/landing-page.component';
import { OpinionsComponent } from './components-deprecated/availablePages/opinions/opinions.component';
import { StarComponent } from './components-deprecated/availablePages/opinions/star/star.component';
import { PriceListComponent } from './components-deprecated/availablePages/price-list/price-list.component';
import { NavBarComponent } from './components-deprecated/nav-bar/nav-bar.component';
import { SurveyModule } from './survey/survey.module';
import { ErrorInterceptor } from './_core/interceptors/error.interceptor';
import { JwtInterceptor } from './_core/interceptors/jwt.interceptor';
import { CoreModule } from './_core/_core.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AboutUsComponent,
    AboutPsychComponent,
    PriceListComponent,
    ContactComponent,
    LandingPageComponent,
    OpinionsComponent,
    StarComponent,
    AboutProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    CoreModule,
    ChatBubblesModule,
    OpenviduSessionModule,
    SurveyModule,
    QuillModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        maxWidth: '1000px',
        minWidth: '40vw',
        maxHeight: '90vh',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
