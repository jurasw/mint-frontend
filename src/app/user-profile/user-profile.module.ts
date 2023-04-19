import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventService } from '../events/services/event.service';
import { ForumService } from '../forum/services/forum.service';
import { ModeratorService } from '../forum/services/moderator.service';
import { AccordionCardComponent } from '../_core/components/reusable/accordion-card/accordion-card.component';
import { CoreModule } from '../_core/_core.module';
import { AdminOptionsComponent } from './components/admin-options/admin-options/admin-options.component';
import { HistoryOfEventsModalComponent } from './components/admin-options/history-of-events-modal/history-of-events-modal.component';
import { HistoryOfPostsModalComponent } from './components/admin-options/history-of-posts-modal/history-of-posts-modal.component';
import { HistoryOfWarningsModalComponent } from './components/admin-options/history-of-warnings-modal/history-of-warnings-modal.component';
import { BlockedUsersComponent } from './components/edit-profile/blocked-users/blocked-users.component';
import { ChangeEmailPhoneComponent } from './components/edit-profile/change-email-phone/change-email-phone.component';
import { ConfirmChangeEmailPhoneModalComponent } from './components/edit-profile/change-email-phone/confirm-change-email-phone-modal/confirm-change-email-phone-modal.component';
import { ChangePasswordComponent } from './components/edit-profile/change-password/change-password.component';
import { EditGeneralInfoComponent } from './components/edit-profile/edit-general-info/edit-general-info.component';
import { EditProfileLayoutComponent } from './components/edit-profile/edit-profile-layout/edit-profile-layout.component';
import { EditProfilePanelComponent } from './components/edit-profile/edit-profile-panel/edit-profile-panel.component';
import { ProfileMainViewComponent } from './components/profile-main-view/profile-main-view.component';
import { UserPictureComponent } from './components/user-pictures/user-picture/user-picture.component';
import { UserPicturesComponent } from './components/user-pictures/user-pictures.component';
import { UserProfileService } from './services/user-profile.service';
import { UserProfileRoutingModule } from './user-profile.routing';
import { DeleteAccountComponent } from './components/edit-profile/delete-account/delete-account.component';
import { DeactivateAccountComponent } from './components/edit-profile/deactivate-account/deactivate-account.component';

@NgModule({
  declarations: [
    ProfileMainViewComponent,
    BlockedUsersComponent,
    UserPicturesComponent,
    ChangePasswordComponent,
    EditProfilePanelComponent,
    EditProfileLayoutComponent,
    EditGeneralInfoComponent,
    ChangeEmailPhoneComponent,
    UserPictureComponent,
    ConfirmChangeEmailPhoneModalComponent,
    HistoryOfWarningsModalComponent,
    HistoryOfPostsModalComponent,
    HistoryOfEventsModalComponent,
    AdminOptionsComponent,
    AccordionCardComponent,
    DeleteAccountComponent,
    DeactivateAccountComponent,
  ],
  providers: [UserProfileService, ForumService, ModeratorService, EventService],
  imports: [CommonModule, CoreModule, UserProfileRoutingModule],
})
export class UserProfileModule {}
