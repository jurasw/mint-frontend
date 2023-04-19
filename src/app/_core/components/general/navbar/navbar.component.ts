import { Component, Input, OnInit } from '@angular/core';
import { ITab } from '../../../models/tab.model';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() public sticky = false;

  public mainTabs: ITab[] = [
    { name: 'Strona główna', url: '/home' },
    { name: 'Blog', url: '/make-dreams' },
    { name: 'O nas', url: '/about-us' },
    { name: 'O projekcie', url: '/about-project' },
  ];

  public additionalTabs: ITab[] = [
    { name: 'Forum', url: '/forums' },
    { name: 'Kalendarz', url: '/calendar' },
    { name: 'Komunikator', url: '/messages' },
    { name: 'Mój profil', url: '/user-profile/my-profile' },
  ];

  constructor(public authService: AuthenticationService) { }

  public ngOnInit(): void {
    if (this.authService.currentUser && this.authService.isUserAdmin) {
      const adminPath = { name: 'Panel administratora', url: '/admin' };
      this.additionalTabs.push(adminPath);
    }
  }

  public logout(): void {
    this.authService.logout();
  }
}
