import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { CoreModule } from '../_core/_core.module';
import { AuthRoutingModule } from './auth.routing';
import { AccountConfirmedComponent } from './components/account-confirmed/account-confirmed.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationConfirmComponent } from './components/registration-confirm/registration-confirm.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SetNewPasswordComponent } from './components/set-new-password/set-new-password.component';
import { AccountConfirmGuard } from './services/account-confirm.guard';
import { LoginService } from './services/login.service';
import { RegistrationGuard } from './services/registration.guard';
import { RegistrationService } from './services/registration.service';
import { SetNewPasswordGuard } from './services/set-new-password.guard';

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegistrationConfirmComponent,
    SetNewPasswordComponent,
    AccountConfirmedComponent,
  ],
  providers: [
    LoginService,
    RegistrationService,
    RegistrationGuard,
    SetNewPasswordGuard,
    AccountConfirmGuard
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    CoreModule,
  ],
})
export class AuthModule {}
