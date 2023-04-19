import { CommonModule } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  NativeDateAdapter
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { format, isValid, parse } from 'date-fns';
import { pl } from 'date-fns/locale';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatepickerComponent } from './components/date/datepicker/datepicker.component';
import { MonthlyDatePickerComponent } from './components/date/monthly-date-picker/monthly-date-picker.component';
import { TimepickerComponent } from './components/date/timepicker/timepicker.component';
import { WeeklyDatePickerComponent } from './components/date/weekly-date-picker/weekly-date-picker.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { NavbarComponent } from './components/general/navbar/navbar.component';
import { NotificationTypePanelComponent } from './components/general/notifications/notification-type-panel/notification-type-panel.component';
import { NotificationsModalComponent } from './components/general/notifications/notifications-modal/notifications-modal.component';
import { NotificationsComponent } from './components/general/notifications/notifications.component';
import { CheckboxComponent } from './components/inputs/checkbox/checkbox.component';
import { DropdownComponent } from './components/inputs/dropdown/dropdown.component';
import { InputTextComponent } from './components/inputs/input-text/input-text.component';
import { MenuComponent } from './components/inputs/menu/menu.component';
import { RadioComponent } from './components/inputs/radio/radio.component';
import { TextareaComponent } from './components/inputs/textarea/textarea.component';
import { CookiesInfoComponent } from './components/layout/cookies-info/cookies-info.component';
import { ImageSliderComponent } from './components/layout/image-slider/image-slider.component';
import { InProgressComponent } from './components/layout/in-progress/in-progress.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { LoginRequiredComponent } from './components/layout/login-required/login-required.component';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { ContactAdvertisingModalComponent } from './components/modals/contact-advertising-modal/contact-advertising-modal.component';
import { InfoModalComponent } from './components/modals/info-modal/info-modal.component';
import { ActiveMeetingsComponent } from './components/reusable/active-meetings/active-meetings.component';
import { AlertMessageComponent } from './components/reusable/alert-message/alert-message.component';
import { AnswerButtonComponent } from './components/reusable/answer-button/answer-button.component';
import { BadgeComponent } from './components/reusable/badge/badge.component';
import { CalendarCardComponent } from './components/reusable/calendar-card/calendar-card.component';
import { ChatEmoticonsComponent } from './components/reusable/chat-emoticons/chat-emoticons.component';
import { CommentComponent } from './components/reusable/comment/comment.component';
import { SurveyRequiredComponent } from './components/reusable/survey-required/survey-required.component';
import { UserImageComponent } from './components/reusable/user-image/user-image.component';
import { LoaderComponent } from './components/utilities/loader/loader.component';
import { PaginationComponent } from './components/utilities/pagination/pagination.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LoaderDirective } from './directives/loader.directive';
import { DateTimePipe } from './pipes/dateTimePipe/date-time.pipe';
import { FileTypePipe } from './pipes/fileTypePipe/file-type.pipe';
import { HighlightSearchPipe } from './pipes/highlightSearchPipe/highlight-search.pipe';
import { ReversePipe } from './pipes/reversePipe/reverse-pipe.pipe';
import { ValidationInfoPipe } from './pipes/validateInfo/validation-info.pipe';
import { AnimationService } from './services/animation.service';
import { DownloadService } from './services/download.service';
import { LocalStorageService } from './services/localstorage.service';
import { NameDayService } from './services/nameday.service';
import { PaginationService } from './services/pagination.service';
import { ReactionService } from './services/reaction.service';
import { SessionStorageService } from './services/sessionstorage.service';
import { UserService } from './services/user.service';
import { InfoPanelComponent } from './components/reusable/info-panel/info-panel.component';
import { HeaderPanelComponent } from './components/reusable/header-panel/header-panel.component';
import { ForumHeaderComponent } from './components/reusable/header-panel/forum-header/forum-header.component';
import { SurveyHeaderComponent } from './components/reusable/header-panel/survey-header/survey-header.component';
import { ProfileMainViewHeaderComponent } from './components/reusable/header-panel/profile-main-view-header/profile-main-view-header.component';
import { CommunicatorHeaderComponent } from './components/reusable/header-panel/communicator-header/communicator-header.component';
import { CalendarHeaderComponent } from './components/reusable/header-panel/calendar-header/calendar-header.component';
import { UserProfileHeaderComponent } from './components/reusable/header-panel/user-profile-header/user-profile-header.component';
import { BlogHeaderComponent } from './components/reusable/header-panel/blog-header/blog-header.component';
import { LoginHeaderComponent } from './components/reusable/header-panel/login-header/login-header.component';
import { AboutUsHeaderComponent } from './components/reusable/header-panel/about-us-header/about-us-header.component';
import { AboutProjectHeaderComponent } from './components/reusable/header-panel/about-project-header/about-project-header.component';
import { RegistrationHeaderComponent } from './components/reusable/header-panel/registration-header/registration-header.component';
import { RegistrationPanelComponent } from './components/reusable/registration-panel/registration-panel.component';

const COMPONENTS = [
  CheckboxComponent,
  NavbarComponent,
  LoaderComponent,
  TextareaComponent,
  InputTextComponent,
  MenuComponent,
  PaginationComponent,
  AlertMessageComponent,
  RadioComponent,
  AnswerButtonComponent,
  LayoutComponent,
  FooterComponent,
  ConfirmationModalComponent,
  InfoModalComponent,
  DropdownComponent,
  CalendarCardComponent,
  ContactAdvertisingModalComponent,
  DatepickerComponent,
  UserImageComponent,
  TimepickerComponent,
  BadgeComponent,
  InProgressComponent,
  LoginRequiredComponent,
  CookiesInfoComponent,
  CommentComponent,
  PageNotFoundComponent,
  ActiveMeetingsComponent,
  WeeklyDatePickerComponent,
  MonthlyDatePickerComponent,
  NotificationsComponent,
  NotificationsModalComponent,
  NotificationTypePanelComponent,
  ChatEmoticonsComponent,
  ImageSliderComponent,
  SurveyRequiredComponent,
  InfoPanelComponent,
  HeaderPanelComponent,
  ForumHeaderComponent,
  SurveyHeaderComponent,
  ProfileMainViewHeaderComponent,
  CommunicatorHeaderComponent,
  CalendarHeaderComponent,
  UserProfileHeaderComponent,
  BlogHeaderComponent,
  LoginHeaderComponent,
  AboutUsHeaderComponent,
  AboutProjectHeaderComponent,
  RegistrationHeaderComponent,
  RegistrationPanelComponent,
];

const SERVICES = [
  ReactionService,
  UserService,
  DownloadService,
  AnimationService,
  LocalStorageService,
  SessionStorageService,
  PaginationService,
  NameDayService,
];

const DIRECTIVES = [LoaderDirective, ClickOutsideDirective];

const PIPES = [
  DateTimePipe,
  FileTypePipe,
  HighlightSearchPipe,
  ValidationInfoPipe,
  ReversePipe,
];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  MatTabsModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatStepperModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatMenuModule,
  NgxPaginationModule,
  MatDialogModule,
  MatBadgeModule,
  MatTooltipModule,
  EmojiModule,
  PickerModule
];
@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  public dateFormat = 'dd.MM.yyyy';
  public getFirstDayOfWeek(): number {
    return 1;
  }

  public parse(value: any): Date | null {
    const formattedDate = parse(value, this.dateFormat, new Date(), { locale: pl });
    if (isValid(formattedDate)) {
      return new Date(formattedDate);
    }
    return null;
  }

  public format(date: Date): string {
    return format(new Date(date), this.dateFormat);
  }
}

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [...MODULES],
  providers: [
    ...SERVICES,
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
  exports: [...COMPONENTS, ...DIRECTIVES, ...MODULES, ...PIPES],
})
export class CoreModule { }
