import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-forum-layout',
  templateUrl: './forum-layout.component.html',
  styleUrls: ['./forum-layout.component.scss'],
})
export class ForumLayoutComponent implements OnInit {
  constructor(private _router: Router, private _authService: AuthenticationService) {}

  public ngOnInit(): void {
    if (this._authService.currentUser && this._authService.currentUser.groups.length === 0) {
      this._router.navigate(['/forums/survey-required']);
    }
  }
}
