import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { ITab } from 'src/app/_core/models/tab.model';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-edit-profile-panel',
  templateUrl: './edit-profile-panel.component.html',
  styleUrls: ['./edit-profile-panel.component.scss'],
})
export class EditProfilePanelComponent implements OnInit, OnDestroy {
  public tabs: ITab[] = [
    { name: 'Informacje ogólne', url: 'general' },
    { name: 'Zdjęcia', url: 'user-pictures' },
    { name: 'Adres e-mail / numer telefonu', url: 'change-email-phone' },
    { name: 'Hasło', url: 'change-password' },
  ];
  private _subscription: Subscription = new Subscription();
  private _dialogSubscription: Subscription = new Subscription();
  constructor(
    public authService: AuthenticationService,
    private _userProfileService: UserProfileService,
    private _dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.tabs.push({
      name: this.authService.isUserWorker
        ? 'Zablokowane konwersacje'
        : 'Zablokowani użytkownicy',
      url: 'blocked-users',
    });
  }

  public deleteAccount(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz dezaktywować konto? Jeśli dezaktywujesz konto, nie będziesz mógł/mogła korzystać z portalu Mint. \nTa decyzja jest odwracalna.',
      },
    });
    this._dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._subscription = this._userProfileService.deleteAccount().subscribe(
          () => {
            this.authService.logout();
          },
          (err) => {}
        );
      }
    });
  }

  public ngOnDestroy(): void {
    this._dialogSubscription.unsubscribe();
    this._subscription.unsubscribe();
  }
}
