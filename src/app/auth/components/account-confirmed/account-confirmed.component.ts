import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-account-confirmed',
  templateUrl: './account-confirmed.component.html',
  styleUrls: ['./account-confirmed.component.scss']
})
export class AccountConfirmedComponent implements OnInit {
  public isConfirmed = false;
  constructor(private _registrationService: RegistrationService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  public ngOnInit(): void {
    this.confirmAccountByLink();
  }

  public confirmAccountByLink(): void {
    const token = this._activatedRoute.snapshot.queryParams.token;
    this._registrationService.confirmAccountByLink(token).pipe(take(1)).subscribe(() => {
      this.isConfirmed = true;
    }, err => {
      this._router.navigate(['/home']);
    });
  }
}
