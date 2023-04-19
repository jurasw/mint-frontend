import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();
  constructor(
    private _authService: AuthenticationService,
    private _userProfileService: UserProfileService
  ) { }

  public ngOnInit(): void { }

  public deleteAccount(): void {
    this._subscription = this._userProfileService.deleteAccount().subscribe(
      () => {
        this._authService.logout();
      },
      (err) => { }
    )
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
