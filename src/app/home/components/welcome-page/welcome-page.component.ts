import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  public sliderImages: string[] = [
    'assets/images/home-page/landscape.jpg',
    'assets/images/home-page/hands.jpg',
    'assets/images/home-page/mint-view.jpg',
    'assets/images/home-page/patient.jpg',
  ];
  public sliderTitles: string[] = [
    'MOTYWACJA',
    'INSPIRACJA',
    'NATCHNIENIE',
    'TERAPIA',
  ];
  public isLoggedUser = false;

  constructor(public router: Router, private _authService: AuthenticationService) {}

  public ngOnInit(): void {
    if (this._authService.currentUser) {
      this.isLoggedUser = true;
    }
  }
}
