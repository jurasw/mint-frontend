import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateAccountComponent } from './components/edit-profile/deactivate-account/deactivate-account.component';
import { DeleteAccountComponent } from './components/edit-profile/delete-account/delete-account.component';
import { EditGeneralInfoComponent } from './components/edit-profile/edit-general-info/edit-general-info.component';
import { EditProfileLayoutComponent } from './components/edit-profile/edit-profile-layout/edit-profile-layout.component';
import { ProfileMainViewComponent } from './components/profile-main-view/profile-main-view.component';
import { UserPicturesComponent } from './components/user-pictures/user-pictures.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'edit-profile',
        component: EditProfileLayoutComponent,
        children: [
          { path: 'general', component: EditGeneralInfoComponent },
          { path: 'user-pictures', component: UserPicturesComponent },
          { path: '**', redirectTo: 'general' },
        ],
      },
      { path: 'deactivate-account', component: DeactivateAccountComponent},
      { path: 'delete-account', component: DeleteAccountComponent},
      { path: 'my-profile', component: ProfileMainViewComponent },
      { path: ':user-id', component: ProfileMainViewComponent },
      { path: '**', redirectTo: 'my-profile' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
