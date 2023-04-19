import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-deactivate-account',
  templateUrl: './deactivate-account.component.html',
  styleUrls: ['./deactivate-account.component.scss']
})
export class DeactivateAccountComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();

  constructor(
    private _authService: AuthenticationService,
    private _userProfileService: UserProfileService
  ) { }

  ngOnInit(): void {
  }

  public deactivateAccount(): void {
    this._subscription = this._userProfileService.deactivateAccount().subscribe(
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
