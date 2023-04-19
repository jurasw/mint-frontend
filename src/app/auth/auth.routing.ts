import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationConfirmComponent } from './components/registration-confirm/registration-confirm.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SetNewPasswordComponent } from './components/set-new-password/set-new-password.component';
import { RegistrationGuard } from './services/registration.guard';
import { SetNewPasswordGuard } from './services/set-new-password.guard';

const routes: Routes = [
  {
    path: 'register',
    children: [
      {
        path: 'form',
        component: RegistrationComponent,
      },
      {
        path: 'confirm-account',
        canActivate: [RegistrationGuard],
        component: RegistrationConfirmComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'set-new-password',
    canActivate: [SetNewPasswordGuard],
    component: SetNewPasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
